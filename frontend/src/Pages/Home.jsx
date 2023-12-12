import React, { useEffect, useState } from "react";
import { Button, Layout, Spin, theme } from "antd";
import { TasksTable } from "../components/TasksTable";
import ModalWindow from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { CreateNewTaskForm } from "../components/CreateNewTaskForm";
import { employees } from "../store/employees";
const { Content } = Layout;
export const Home = observer(() => {
    //Кнопка создания новой задачи будет доступной, только если авторизовался руководитель
    //и у объекта auth есть поля userId и FullName, а так же доступен массив работников
    //для селектора с ответсвенными
    const createButtonIsAvailable =
        auth?.userId &&
        auth?.userFullName &&
        auth.isDirector &&
        employees.employeesList.length;
    //
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    useEffect(() => {
        employees.getEmployeesList();
    }, []);
    return (
        <Content style={{ margin: "20px 16px" }}>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                }}
            >
                <Button
                    type="primary"
                    onClick={() => setShowCreateTaskModal(true)}
                    disabled={!createButtonIsAvailable}
                >
                    Создать новую задачу
                </Button>

                <ModalWindow
                    visible={showCreateTaskModal}
                    setVisible={setShowCreateTaskModal}
                >
                    <CreateNewTaskForm isNewForm={true} />
                </ModalWindow>

                <TasksTable />
            </div>
        </Content>
    );
});
