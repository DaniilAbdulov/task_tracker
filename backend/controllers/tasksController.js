import { tasksList } from "../data/tasksList.js";
import { taskData } from "../data/taskData.js";
import { getValuesForStatusSteps } from "../functions/getValuesForStatusSteps.js";
class TasksController {
    async getTasksList(req, res) {
        try {
            const { page, pageSize } = req.query;
            console.log(page);
            console.log(pageSize);

            setTimeout(() => {
                return res.status(200).json({ tasksList });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    async getTaskData(req, res) {
        try {
            console.log(req.query.taskId);
            const selectedTask = taskData;
            const statusAndDates = getValuesForStatusSteps(
                selectedTask.created_at,
                selectedTask.updated_at
            );
            const currentStatus = selectedTask.status;
            setTimeout(() => {
                return res
                    .status(200)
                    .json({ selectedTask, statusAndDates, currentStatus });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    async changeTaskStatus(req, res) {
        try {
            const { taskId, newStatus } = req.body.params;
            console.log(taskId, newStatus);
            setTimeout(() => {
                return res.status(200).json({
                    message: `Статус задания - ${newStatus}`,
                });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    async createNewTask(req, res) {
        try {
            const {
                title,
                description,
                priority,
                ends_in,
                created_at,
                updated_at,
                status,
                author_id,
                inspector_id,
            } = req.body.params.newTask;
            console.log([
                title,
                description,
                priority,
                ends_in,
                created_at,
                updated_at,
                status,
                author_id,
                inspector_id,
            ]);
            setTimeout(() => {
                return res.status(200).json({
                    message: `Задача создана`,
                });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    async changeTask(req, res) {
        try {
            console.log(req.body.params);
            setTimeout(() => {
                return res.status(200).json({
                    message: `Задача Изменена`,
                });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TasksController();
