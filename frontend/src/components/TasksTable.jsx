import React, { useState } from "react";
import { Table, Tag } from "antd";
import { compareDate } from "../functions/compareData";
import ModalWindow from "./ModalWindow";

//список работников
const filters = [
    {
        id: 1,
        text: "Абдулов Даниил Билалович",
        value: "Абдулов Даниил Билалович",
    },
    {
        id: 2,
        text: "Герасимов Олег Анатольевич",
        value: "Герасимов Олег Анатольевич",
    },
    {
        id: 3,
        text: "Решетов Андрей Сергеевич",
        value: "Решетов Андрей Сергеевич",
    },
];
//названия столбоцов и данные в них
const columns = [
    {
        title: "Задача",
        dataIndex: "title",
        key: "title",
        render: (text, status) => {
            const isDone = status.status === "Выполнена";
            //если текущая дата меньше, чем дата завершения задачи, то функция вернет true
            const toLate = compareDate(status.ends_in);
            return (
                <p
                    style={{
                        color: toLate ? "red" : isDone ? "green" : "gray",
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
            //если текущая дата меньше, чем дата завершения задачи, то функция вернет true
            const toLate = compareDate(status.ends_in);
            return (
                <p
                    style={{
                        color: toLate ? "red" : "gray",
                    }}
                >
                    {text}
                </p>
            );
        },
    },
    {
        title: "Исполнитель",
        dataIndex: "inspector",
        key: "inspector",
        filters: filters,
        filterMode: "menu",
        filterSearch: true,
        onFilter: (value, record) => {
            console.log(record.inspector);
            return value === record.inspector;
        },
    },
    {
        title: "Статус",
        key: "status",
        dataIndex: "status",
    },
];

//данные для таблицы
const data = [
    {
        id: 1,
        title: "Продажа вартиры",
        ends_in: "2023-12-07",
        priority: "Высокий",
        status: "Выполняется",
        inspector: "Герасимов Олег Анатольевич",
    },
    {
        id: 2,
        title: "Продажа картиры",
        ends_in: "2023-12-08",
        priority: "Высокий",
        status: "Выполнена",
        inspector: "Герасимов Олег Анатольевич",
    },
    {
        id: 3,
        title: "Продажа кварт",
        ends_in: "2023-12-09",
        priority: "Низкий",
        status: "К выполнению",
        inspector: "Герасимов Олег Анатольевич",
    },
    {
        id: 4,
        title: "Продажа кварт",
        ends_in: "2023-12-06",
        priority: "Средний",
        status: "К выполнению",
        inspector: "Герасимов Олег Анатольевич",
    },

    {
        id: 5,
        title: "Продажа кварти",
        ends_in: "2023-12-08",
        priority: "Высокий",
        status: "Отменена",
        inspector: "Герасимов Олег Анатольевич",
    },
    {
        id: 6,
        title: "Продажа квартир",
        ends_in: "2023-12-08",
        priority: "Высокий",
        status: "К выполнению",
        inspector: "Герасимов Олег Анатольевич",
    },
];
export const TasksTable = () => {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const handleRowClick = (record) => {
        const id = record.id;
        setShowCreateTaskModal(true);
        console.log(id);
    };
    console.log(showCreateTaskModal);
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
            ></Table>
            <ModalWindow
                visible={showCreateTaskModal}
                setVisible={setShowCreateTaskModal}
            />
        </>
    );
};
