import { useState } from "react";
import { Button, Space } from "antd";
import { observer } from "mobx-react-lite";
import { auth } from "../../store/auth";

export const ButtonsForModalWindow = observer(({ setVisible }) => {
    const actionIsCreate = false;
    const isDirector = auth.isDirector;
    const [loading, setLoading] = useState(false);
    const handleAccepted = () => {
        setVisible(false);
    };
    const handleDone = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleCreate = () => {
        setVisible(false);
    };
    const handleChange = () => {
        setVisible(false);
    };
    const checkFormButtons = [
        <Button key="accepted" onClick={handleAccepted} loading={loading}>
            Принять к исполнению
        </Button>,
        <Button
            style={{ backgroundColor: "green" }}
            key="done"
            type="primary"
            loading={loading}
            onClick={handleDone}
        >
            Выполнено
        </Button>,
    ];
    const changeFormButtons = [
        <Button key="change" onClick={handleChange} loading={loading}>
            Изменить задачу
        </Button>,
        <Button
            key="cancel"
            loading={loading}
            onClick={handleCancel}
            danger
            ghost
        >
            Отменить задание
        </Button>,
    ];
    const createFormButtons = [
        <Button
            key="create"
            type="primary"
            onClick={handleCreate}
            loading={loading}
        >
            Создать задачу
        </Button>,
    ];
    const currentFormButtons = isDirector
        ? actionIsCreate
            ? createFormButtons
            : changeFormButtons
        : checkFormButtons;
    return (
        <Space style={{ marginTop: "20px" }}>
            {currentFormButtons.map((btn) => {
                console.log(btn);
                return btn;
            })}
        </Space>
    );
});
