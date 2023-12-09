import React, { useState } from "react";
import { Button, Layout, theme } from "antd";
import { TasksTable } from "../components/TasksTable";
import ModalWindow from "../components/ModalWindow";
import { Segmets } from "../components/UI/Segmets";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
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
                {isDirector && (
                    <Button
                        type="primary"
                        onClick={() => setShowCreateTaskModal(true)}
                    >
                        Создать новую задачу
                    </Button>
                )}
                <Segmets />
                <ModalWindow
                    visible={showCreateTaskModal}
                    setVisible={setShowCreateTaskModal}
                />
                <TasksTable />
            </div>
        </Content>
    );
});
