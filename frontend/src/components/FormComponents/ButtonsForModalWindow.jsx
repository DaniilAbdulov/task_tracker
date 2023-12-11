// import { useState } from "react";
import { Button, Space } from "antd";
import { observer } from "mobx-react-lite";
import { auth } from "../../store/auth";
import { tasks } from "../../store/tasks";

export const ButtonsForModalWindow = observer(({ isNewForm }) => {
    const isDirector = auth.isDirector;
    const action = isDirector ? (isNewForm ? "create" : "edit") : "check";
    const taskStatus = tasks.currentStatus;
    //actions create edit check
    // const [loading, setLoading] = useState(false);
    const handleAccepted = () => {
        alert("Accepted");
        //setVisible(false);
    };
    const handleDone = () => {
        alert("Done");
        //setVisible(false);
    };
    const handleCancel = () => {
        alert("Cancel");
        //setVisible(false);
    };
    const handleCreate = () => {
        alert("Create");
        //setVisible(false);
    };
    const handleChange = () => {
        alert("Change");
        //setVisible(false);
    };
    const formButtons = [
        {
            id: 1,
            key: "accepted",
            clickHandler: handleAccepted,
            type: "default",
            htmlType: "button",
            title: "Принять к исполнению",
            action: "check",
            style: {
                color: "",
                backgroundColor: "",
            },
            isDisabled: taskStatus === "К исполнению" ? false : true,
        },
        {
            id: 2,
            key: "done",
            clickHandler: handleDone,
            type: "primary",
            htmlType: "button",
            title: "Выполнено",
            action: "check",
            style: {
                color: "",
                backgroundColor: "green",
            },
            isDisabled:
                taskStatus === "Выполняется" || taskStatus === "К исполнению"
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
                taskStatus === "К исполнению" || taskStatus === "Выполняется"
                    ? false
                    : true,
        },
        {
            id: 4,
            key: "cancel",
            clickHandler: handleCancel,
            type: "default",
            htmlType: "button",
            title: "Отменить задание",
            action: "edit",
            style: {
                color: "red",
                backgroundColor: "",
            },
            isDisabled:
                taskStatus === "К исполнению" || taskStatus === "Выполняется"
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
                        onClick={() => btn.clickHandler()}
                        // loading={loading}
                        htmlType={btn.htmlType}
                        style={btn.style}
                        disabled={btn.isDisabled}
                    >
                        {btn.title}
                    </Button>
                ))}
        </Space>
    );
});
