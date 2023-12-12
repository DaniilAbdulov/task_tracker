// import { useState } from "react";
import { Button, Space } from "antd";
import { observer } from "mobx-react-lite";
import { auth } from "../../store/auth";
import { tasks } from "../../store/tasks";
import { useState } from "react";

export const ButtonsForModalWindow = observer(({ isNewForm }) => {
    const [taskId, setTaskId] = useState(tasks.selectedTask.id);
    const isDirector = auth.isDirector;
    const action = isDirector ? (isNewForm ? "create" : "edit") : "check";
    const taskStatus = tasks.currentStatus;
    const isLoading = tasks.taskLoading;
    const handleChangeStatus = (taskId, key) => {
        tasks.changeTaskStatus(taskId, key);
    };
    const handleCreate = () => {
        return;
    };
    const handleChange = () => {
        alert(`Изменить задачу`);
        //setVisible(false);
    };
    const formButtons = [
        {
            id: 1,
            key: "Выполняется",
            clickHandler: handleChangeStatus,
            type: "default",
            htmlType: "button",
            title: "Принять к выполнению",
            action: "check",
            style: {
                color: "",
                backgroundColor: "",
            },
            isDisabled: taskStatus === "К выполнению" ? false : true,
        },
        {
            id: 2,
            key: "Выполнена",
            clickHandler: handleChangeStatus,
            type: "primary",
            htmlType: "button",
            title: "Выполнено",
            action: "check",
            style: {
                color: "",
                backgroundColor: "green",
            },
            isDisabled:
                taskStatus === "Выполняется" || taskStatus === "К выполнению"
                    ? false
                    : true,
        },
        {
            id: 3,
            key: "change",
            clickHandler: handleChange,
            type: "default",
            htmlType: "submit",
            title: "Изменить задачу",
            action: "edit",
            style: {
                color: "white",
                backgroundColor: "blue",
            },
            isDisabled:
                taskStatus === "К выполнению" ||
                taskStatus === "Выполняется" ||
                auth.userFullName === tasks.selectedTask.author
                    ? false
                    : true,
        },
        {
            id: 4,
            key: "Отменена",
            clickHandler: handleChangeStatus,
            type: "default",
            htmlType: "button",
            title: "Отменить задание",
            action: "edit",
            style: {
                color: "red",
                backgroundColor: "",
            },
            isDisabled:
                taskStatus === "К выполнению" || taskStatus === "Выполняется"
                    ? false
                    : true,
        },
        {
            id: 5,
            key: "create",
            clickHandler: handleCreate,
            type: "primary",
            htmlType: "submit",
            title: "Создать задачу",
            action: "create",
            style: {
                color: "",
                backgroundColor: "blue",
            },
            isDisabled: false,
        },
    ];

    return (
        <Space style={{ marginTop: "20px" }}>
            {formButtons
                .filter((btn) => btn.action === `${action}`)
                .map((btn) => (
                    <Button
                        key={btn.key}
                        type={btn.type}
                        onClick={() => btn.clickHandler(taskId, btn.key)}
                        htmlType={btn.htmlType}
                        style={btn.style}
                        disabled={btn.isDisabled || isLoading}
                    >
                        {btn.title}
                    </Button>
                ))}
        </Space>
    );
});
