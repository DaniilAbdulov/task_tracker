import { Button, Space } from "antd";
import { observer } from "mobx-react-lite";
import { auth } from "../../store/auth";
import { tasks } from "../../store/tasks";

export const ButtonsForModalWindow = observer(({ isNewForm }) => {
    const isDirector = auth.isDirector;
    const currentUser = auth.userFullName;
    /*Если авторизован директор, то, если это новая задача, 
    то будет только одна кнопка "Создать", 
    если не новая, то будут кнопки "Изменить" и "Отменить". 
    Иначе будут кнопки пользователя: 
    "Принять к выполнению" и "Выполнено"*/
    const action = isDirector ? (isNewForm ? "create" : "edit") : "check";

    const taskId = tasks.selectedTask.id;
    const task_author = tasks.selectedTask.author;
    const taskStatus = tasks.selectedTask.status;
    const isLoading = tasks.taskLoading;
    //Недоступность кнопок в зависимости от статуса
    function cancelAndEditBtnDisable(s, c, t) {
        if (s === 3 || s === 4) {
            return false;
        }
        if (c !== t) {
            return false;
        }
        return true;
    }
    //отправляем на бэкенд запрос на изменение задачи с id - taskId
    const handleChangeStatus = (taskId, key) => {
        tasks.changeTaskStatus(taskId, key);
    };
    const handleCreate = () => {
        return;
    };
    const handleChange = () => {
        return;
    };
    const formButtons = [
        {
            id: 2,
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
            isDisabled: taskStatus !== 1,
        },
        {
            id: 3,
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
            isDisabled: taskStatus === 2 || taskStatus === 1 ? false : true,
        },
        {
            id: 1,
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
            isDisabled: !cancelAndEditBtnDisable(
                taskStatus,
                currentUser,
                task_author
            ),
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
            isDisabled: !cancelAndEditBtnDisable(
                taskStatus,
                currentUser,
                task_author
            ),
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
                        onClick={() => btn.clickHandler(taskId, btn.id)}
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
