import React, { useEffect, useState } from "react";
import { ConfigProvider, Spin, Table, Tag } from "antd";
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
export const TasksTable = observer(() => {
    const data = getWorkData(tasks, users);
    //получить после вызова getTasks
    const [countTasks, setCountTasks] = useState(20);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
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
    const [showModal, setShowModal] = useState(false);

    const handleRowClick = (record) => {
        const id = record.id;
        setShowModal(true);
        console.log(id);
    };

    const rowProps = (record) => {
        return {
            onClick: () => handleRowClick(record),
        };
    };
    const onPageChange = (page, pageSize) => {
        console.log(page, pageSize);
        //async getTasks(page,pageSize)
    };
    useEffect(() => {
        //async getTasks(1,10)
    }, []);
    return (
        <>
            <Table
                pagination={{
                    showSizeChanger: true,
                    onChange: onPageChange,
                    defaultCurrent: 1,
                    total: countTasks,
                    pageSizeOptions: ["10", "20", "30", "50"],
                }}
                rowKey="id"
                onRow={rowProps}
                columns={columns}
                dataSource={data}
                loading={loading}
            ></Table>

            {formLoading ? (
                <Spin fullscreen />
            ) : (
                <ModalWindow visible={showModal} setVisible={setShowModal}>
                    <EditTaskForm isNewForm={false} />
                </ModalWindow>
            )}
        </>
    );
});
