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
    const data = tasks.tasksList;
    const tableDataLoading = tasks.tasksListFetching || employees.isLoading;

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    //Число всех задач
    const totalRecords = tasks.totalRecords;
    //если объект содержит 12 ключей, то его можно отображать
    const taskDataIsAvailable = Object.keys(tasks.selectedTask).length === 12;
    const isDirector = auth.isDirector;
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    //список работников
    const employeesList = employees.employeesList;
    const [employeesFilter, setEmployeesFilter] = useState(employeesList);
    //названия столбоцов и данные в них
    const columns = [
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
            filteredValue: filteredInfo.ends_in || null,
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
            filters:
                isDirector && employeesList.length ? employeesFilter : null,
            filterMode: "menu",
            filterSearch: true,
            filteredValue: filteredInfo.inspector || null,
            onFilter: (value, record) => {
                return value === record.inspector;
            },
            sortOrder:
                sortedInfo.columnKey === "inspector" ? sortedInfo.order : null,
        },
        {
            title: "Статус",
            key: "status",
            dataIndex: "status",
        },
    ];
    const handleChange = (pagination, filters, sorter) => {
        // Устанавливаем информацию о фильтрах и сортировке
        setFilteredInfo(filters);
        setSortedInfo(sorter);
        // Обработка фильтров
        let newEmployees;
        if (filters && filters.inspector) {
            // Применяем фильтр по инспекторам
            newEmployees = employees.employeesList.filter((record) =>
                filters.inspector.includes(record.value)
            );
        } else {
            // Если фильтра нет, используем исходный список
            newEmployees = [...employees.employeesList];
        }
        setEmployeesFilter(newEmployees);
        if (
            currentPage !== pagination.current ||
            currentPageSize !== pagination.pageSize
        ) {
            tasks.getTasksList(pagination.current, pagination.pageSize);
            setCurrentPage(pagination.current);
            setCurrentPageSize(pagination.pageSize);
            //сбрасываем фильтры и сортировки
            setFilteredInfo({});
            setSortedInfo({});
            setEmployeesFilter(employees.employeesList);
        }
    };
    useEffect(() => {
        tasks.getTasksList(currentPage, currentPageSize);
    }, []);

    const handleRowClick = (record) => {
        const id = record.id;
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
                pagination={{
                    defaultCurrent: 1,
                    total: totalRecords,
                }}
                rowKey="id"
                onRow={rowProps}
                columns={columns}
                dataSource={data}
                loading={tableDataLoading}
                onChange={handleChange}
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
