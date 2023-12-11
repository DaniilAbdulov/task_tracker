import React, { useState } from "react";
import { Table, Tag } from "antd";
import { compareDate } from "../functions/compareData";
import ModalWindow from "./ModalWindow";
import { usersNames } from "../data/usersNames";
import { getWorkData } from "../data/getWorkData";
import { tasks } from "../data/tasks";
import { users } from "../data/users";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { EditTaskForm } from "./EditTaskForm";
//данные для таблицы
const data = getWorkData(tasks, users);
export const TasksTable = observer(() => {
    const isDirector = auth.isDirector;
    //список работников
    const filters = usersNames;
    //названия столбоцов и данные в них
    const columns = [
        {
            title: "Задача",
            dataIndex: "title",
            key: "title",
            render: (text, status) => {
                const isDone = status.status === "Выполнено";
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
            title: "К исполнению",
            dataIndex: "ends_in",
            key: "ends_in",
            render: (text, status) => {
                const isDone = status.status === "Выполнена";
                //если текущая дата меньше, чем дата завершения задачи, то функция вернет true
                const toLate = compareDate(status.ends_in) < 0;
                return (
                    <p
                        style={{
                            color: toLate && !isDone ? "red" : "gray",
                        }}
                    >
                        {text}
                    </p>
                );
            },
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
            sorter: isDirector
                ? (a, b) => {
                      const firstVal = a.inspector.split(" ")[0];
                      const secondVal = b.inspector.split(" ")[0];
                      return firstVal.localeCompare(secondVal);
                  }
                : null,
            filters: isDirector ? filters : null,
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
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    const handleRowClick = (record) => {
        const id = record.id;
        setShowCreateTaskModal(true);
        console.log(id);
    };

    const rowProps = (record, rowIndex) => {
        return {
            onClick: () => handleRowClick(record),
        };
    };
    return (
        <>
            <Table
                rowKey="id"
                onRow={rowProps}
                columns={columns}
                dataSource={data}
                // loading={true}
            ></Table>
            <ModalWindow
                visible={showCreateTaskModal}
                setVisible={setShowCreateTaskModal}
            >
                <EditTaskForm isNewForm={false} />
            </ModalWindow>
        </>
    );
});
