import React, { useState } from "react";
import { Button, Layout, Spin, theme } from "antd";
import { TasksTable } from "../components/TasksTable";
import ModalWindow from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { CreateNewTaskForm } from "../components/CreateNewTaskForm";
const { Content } = Layout;
export const Home = observer(() => {
    const isDirector = auth.isDirector;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

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
                    disabled={!isDirector}
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
