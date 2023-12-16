import { formattedTaskData } from "../functions/formattedTaskData.js";
import { db } from "../db/db.js";
import { getValuesForStatusSteps } from "../functions/getValuesForStatusSteps.js";
import { validateChangedTaskFields } from "../functions/validateChangedTaskFields.js";
import { validateTaskFields } from "../functions/validateTaskFields.js";
import { formattedDate } from "../functions/formattedDate.js";
class TasksController {
    async getTasksList(req, res) {
        try {
            const { id, role } = req.user;
            //данные для пагинации
            const page = parseInt(req.query.page);
            const pageSize = parseInt(req.query.pageSize);
            const offset = (page - 1) * pageSize;
            //запрос на получение записей
            const list = await db
                .select([
                    "t.id",
                    "t.title",
                    "t.priority",
                    "t.ends_in",
                    "t.status",
                    "t.status",
                    db.raw(
                        "CONCAT(u.last_name, ' ', u.first_name, ' ', COALESCE(u.third_name,'')) AS inspector"
                    ),
                ])
                .from("tasks as t")
                .join("users as u", "t.inspector_id", "=", "u.id")
                .modify((queryBuilder) => {
                    if (role === "employee") {
                        queryBuilder.where("t.inspector_id", id);
                    }
                    // Для 'director', никаких ограничений на записи нет
                })
                //Без группировок: список всех задач, отсортированных по дате
                // последнего обновления
                .orderBy("t.updated_at", "asc")
                .limit(pageSize)
                .offset(offset);
            if (!list.length) {
                return res
                    .status(400)
                    .json({ message: "Ошибка получения списка задач" });
            }
            const tasksList = list.map((task) => ({
                ...task,
                ends_in: formattedDate(task.ends_in),
            }));
            //кол-во всех записей для пагинации
            const totalRecordsResult = await db("tasks as t")
                .modify((queryBuilder) => {
                    if (role === "employee") {
                        queryBuilder.where("t.inspector_id", id);
                    }
                    // Для 'director', никаких ограничений на записи нет
                })
                .count("* as count")
                .first();

            const totalRecords = parseInt(totalRecordsResult.count, 10);
            if (isNaN(totalRecords) || totalRecords < 0) {
                return res
                    .status(400)
                    .json({
                        message: "Ошибка получения количества всех задач",
                    });
            }
            //если все ок, то отпаравляем ответ
            setTimeout(() => {
                return res.status(200).json({ tasksList, totalRecords });
            }, 1000);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Непредвиденная ошибка сервера" });
        }
    }
    async getTaskData(req, res) {
        try {
            const taskId = parseInt(req.query.taskId);
            if (!taskId || taskId <= 0) {
                return res
                    .status(422)
                    .json({ message: "Некорректный id задачи" });
            }
            const taskData = await db("tasks as t")
                .select(
                    "t.id",
                    db.raw(
                        "CONCAT(a.last_name, ' ', a.first_name, ' ', COALESCE(a.third_name, '')) AS author"
                    ),
                    "t.inspector_id",
                    db.raw(
                        "CONCAT(i.last_name, ' ', i.first_name, ' ', COALESCE(i.third_name, '')) AS inspector"
                    ),
                    "t.priority",
                    "t.title",
                    "t.description",
                    "t.ends_in",
                    "t.created_at",
                    "t.updated_at",
                    "t.status"
                )
                .leftJoin("users as a", "t.author_id", "a.id")
                .leftJoin("users as i", "t.inspector_id", "i.id")
                .where("t.id", taskId)
                .first();
            if (!taskData) {
                return res
                    .status(400)
                    .json({ message: "Ошибка получения данных о задаче" });
            }
            const selectedTask = formattedTaskData(taskData);
            const statusAndDates = getValuesForStatusSteps(
                selectedTask.created_at,
                selectedTask.updated_at
            );
            const currentStatus = selectedTask.status;

            return res
                .status(200)
                .json({ selectedTask, statusAndDates, currentStatus });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Непредвиденная ошибка сервера" });
        }
    }
    async changeTaskStatus(req, res) {
        try {
            const taskId = parseInt(req.body.params.taskId);
            const newStatus = req.body.params.newStatus;
            if (
                typeof newStatus !== "string" ||
                typeof taskId !== "number" ||
                taskId <= 0
            ) {
                return res.status(422).json({ message: "Некорректные данные" });
            }

            const currentStatus = await db
                .select(["status"])
                .from("tasks")
                .where("id", "=", taskId)
                .first();
            if (currentStatus.status === newStatus) {
                return res
                    .status(400)
                    .json({ message: "Статус уже был изменен" });
            }
            const tryToChangeStatus = await db("tasks")
                .where("id", "=", taskId)
                .update({
                    status: newStatus,
                    updated_at: new Date(),
                });
            if (!tryToChangeStatus) {
                return res
                    .status(400)
                    .json({ message: "Ошибка изменения статуса" });
            }

            return res.status(200).json({
                message: `Статус задания - ${newStatus}`,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Непредвиденная ошибка сервера" });
        }
    }
    async createNewTask(req, res) {
        try {
            const dataIsValid = validateTaskFields(req.body.params.newTask);
            if (!dataIsValid) {
                return res
                    .status(422)
                    .json({ message: "Данные из формы не корректны" });
            }
            const {
                title,
                description,
                ends_in,
                created_at,
                updated_at,
                priority,
                status,
                author_id,
                inspector_id,
            } = dataIsValid;
            const tryToCreateNewTask = await db("tasks").insert({
                title: title,
                description: description,
                ends_in: ends_in,
                created_at: created_at,
                updated_at: updated_at,
                priority: priority,
                status: status,
                author_id: author_id,
                inspector_id: inspector_id,
            });
            if (
                tryToCreateNewTask.command !== "INSERT" ||
                !tryToCreateNewTask.rowCount
            ) {
                return res
                    .status(400)
                    .json({ message: "Ошибка добавления задачи" });
            }

            return res.status(200).json({
                message: `Задача создана`,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Непредвиденная ошибка сервера" });
        }
    }
    async changeTask(req, res) {
        try {
            const taskId = parseInt(req.body.params.taskId);
            if (typeof taskId !== "number" || taskId <= 0) {
                return res
                    .status(422)
                    .json({ message: "Некорректный id задачи" });
            }
            const dataIsValid = validateChangedTaskFields(
                req.body.params.newValues
            );
            if (!dataIsValid) {
                return res
                    .status(422)
                    .json({ message: "Данные из формы не корректны" });
            }
            const {
                title,
                description,
                ends_in,
                updated_at,
                priority,
                inspector_id,
            } = dataIsValid;
            const tryToChangeTask = await db("tasks")
                .where("id", "=", taskId)
                .update({
                    title: title,
                    description: description,
                    ends_in: ends_in,
                    updated_at: updated_at,
                    priority: priority,
                    inspector_id: inspector_id,
                });
            if (!tryToChangeTask) {
                return res
                    .status(400)
                    .json({ message: "Ошибка изменения задачи" });
            }

            return res.status(200).json({
                message: `Задача изменена`,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Непредвиденная ошибка сервера" });
        }
    }
}

export default new TasksController();
