import React, { useEffect, useState } from "react";
import { Flex, Spin, Table, Tag } from "antd";
import { compareDate } from "../functions/compareData";
import ModalWindow from "./ModalWindow";
import { tasks } from "../store/tasks";
import { employees } from "../store/employees";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { EditTaskForm } from "./EditTaskForm";

export const TasksTable = observer(() => {
    //получаем список всех задач
    useEffect(() => {
        tasks.getTasksList();
    }, []);
    const isDirector = auth.isDirector;
    //список работников
    const employeesList = employees.employeesList;
    const data = tasks.tasksList;
    const tableDataLoading = tasks.tasksListFetching || employees.isLoading;
    //если объект содержит 12 ключей, то его можно отображать
    const taskDataIsAvailable = Object.keys(tasks.selectedTask).length === 12;
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    //названия столбоцов и данные в них
    const columns = [
        // В списке для каждой задачи отобразите: заголовок, приоритет,
        // дату окончания, ответственного, статус
        {
            title: "Задача",
            dataIndex: "title",
            key: "title",
            render: (text, status) => {
                const isDone = status.status === "Выполнена";
                //если текущая дата меньше, чем дата завершения задачи, то функция вернет true
                const toLate = compareDate(status.ends_in) < 0;
                return (
                    <p
                        style={{
                            color: isDone ? "green" : toLate ? "red" : "gray",
                            fontWeight: "bold",
                        }}
                    >
                        {text}
                    </p>
                );
            },
        },
        {
            title: "Приоритет",
            dataIndex: "priority",
            key: "priority",
            render: (priority) => {
                return (
                    <Tag
                        color={
                            priority === "Высокий"
                                ? "red"
                                : priority === "Средний"
                                ? "yellow"
                                : "green"
                        }
                        key={priority}
                    >
                        {priority.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "К выполнению",
            dataIndex: "ends_in",
            key: "ends_in",
            render: (text, status) => {
                const isDone = status.status === "Выполнена";
                //если текущая дата меньше, чем дата завершения задачи, то функция вернет true
                const toLate = compareDate(status.ends_in) < 0;
                return (
                    //Заголовки незавершенных задач с датой окончания < текущая дата
                    // отображаются красным цветом. Заголовки завершенных задач
                    // отображаются зеленым цветом. Остальные - серым.
                    <p
                        style={{
                            color: toLate && !isDone ? "red" : "gray",
                        }}
                    >
                        {text}
                    </p>
                );
            },
            // С группировкой по дате завершения: задачи авторизованного
            // пользователя на сегодня, на неделю, на будущее (больше чем
            // на неделю)
            //Внес от себя 'Срок прошел', подумал, что не будет лишним
            filters: [
                { text: "Срок прошел", value: "toolate" },
                { text: "Сегодня", value: "today" },
                { text: "1-7 дней", value: "weekly" },
                { text: "Больше недели", value: "month" },
            ],
            filterMode: "menu",
            onFilter: (value, record) => {
                const daysDiff = compareDate(record.ends_in);
                switch (value) {
                    case "toolate":
                        return daysDiff < 0;
                    case "today":
                        return daysDiff === 0;
                    case "weekly":
                        return daysDiff >= 1 && daysDiff <= 7;
                    case "month":
                        return daysDiff > 7;
                    default:
                        break;
                }
                return false;
            },
        },
        {
            title: "Исполнитель",
            dataIndex: "inspector",
            key: "inspector",
            // С группировкой по ответственным (режим просмотра для
            // руководителя)
            sorter: isDirector
                ? (a, b) => {
                      const firstVal = a.inspector.split(" ")[0];
                      const secondVal = b.inspector.split(" ")[0];
                      return firstVal.localeCompare(secondVal);
                  }
                : null,
            filters: isDirector && employeesList.length ? employeesList : null,
            filterMode: "menu",
            filterSearch: true,
            onFilter: (value, record) => {
                return value === record.inspector;
            },
        },
        {
            title: "Статус",
            key: "status",
            dataIndex: "status",
        },
    ];

    const handleRowClick = (record) => {
        const id = record.id;
        // При клике на задачу открывается модальное окно с возможностью
        // редактирования атрибутов выбранной задачи.

        setShowEditTaskModal(true);
        tasks.getTaskData(id);
    };
    const rowProps = (record) => {
        return {
            onClick: () => handleRowClick(record),
        };
    };
    return (
        <>
            <Table
                pagination={false}
                rowKey="id"
                onRow={rowProps}
                columns={columns}
                dataSource={data}
                loading={tableDataLoading}
            ></Table>
            <ModalWindow
                visible={showEditTaskModal}
                setVisible={setShowEditTaskModal}
            >
                {taskDataIsAvailable ? (
                    <EditTaskForm isNewForm={false} />
                ) : (
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: "500px" }}
                    >
                        <Spin />
                    </Flex>
                )}
            </ModalWindow>
        </>
    );
});


/*В ТЗ не было сказано про добавление функционала пагинации, 
но мною была предприянта попытка ее осуществить. 
У библиотеки antDesign в компоненте Table есть встроенный фукнционал. 
Пагинацию я осуществил. На Бэке был кусок кода 
отвечающий за определенный лимит записей и 
начальной позиции(можно увидеть в истории коммитов), но 
у предоставляемой API была проблема: 
при нахождениии на 2-3... страницах и установке какого-либо фильтра, 
автоматически отправлялся новый запрос на сервер 
с Номером страницы - 1 и количеством записей - 10. 
Пофиксить я это так и не смог, поэтому, 
согласно ТЗ оставил все без пагинации.*/
