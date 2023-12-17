import React, { useEffect, useState } from "react";
import { Flex, Spin, Table, Tag } from "antd";
import { compareDate } from "../functions/compareData";
import ModalWindow from "./ModalWindow";
import { tasks } from "../store/tasks";
import { employees } from "../store/employees";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { EditTaskForm } from "./EditTaskForm";
import { MyPagination } from "./UI/MyPagination";
import { priorities } from "../data/priorities";
import { statuses } from "../data/statuses";

export const TasksTable = observer(() => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalTasksCount = tasks.totalRecords;
    //получаем список всех задач с определнным лимитом
    useEffect(() => {
        tasks.getTasksList(currentPage, 10);
    }, [currentPage]);
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
                const isDone = status.status === 3;
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
                            priority === 1
                                ? "red"
                                : priority === 2
                                ? "yellow"
                                : "green"
                        }
                        key={priority}
                    >
                        {priorities
                            .filter((p) => p.id === priority)
                            .map((p) => p.label)}
                    </Tag>
                );
            },
        },
        {
            title: "К выполнению",
            dataIndex: "ends_in",
            key: "ends_in",
            render: (text, status) => {
                const isDone = status.status === 3;
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
            render: (text) => {
                return (
                    <p key={text}>
                        {statuses
                            .filter((s) => s.id === text)
                            .map((s) => s.value)}
                    </p>
                );
            },
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
            <MyPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalCount={totalTasksCount}
            />
        </>
    );
});
