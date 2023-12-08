import etagi_logo from "../asserts/etagi_logo.webp";
import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { TasksTable } from "../components/TasksTable";
import ModalWindow from "../components/ModalWindow";
const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        label: "Срок",
        key: "Срок",
        icon: "",
        children: [
            { label: "Все задачи", key: "" },
            { label: "Сегодня", key: "Сегодня" },
            { label: "1-7 дней", key: "1-7 дней" },
            { label: "Больше недели", key: "Больше недели" },
        ],
        onClick: (value) => {
            console.log(value.key);
        },
    },
];
export const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[""]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{ padding: 0, background: colorBgContainer }}
                    className="header"
                >
                    <div className="header__logo">
                        <img src={etagi_logo} alt="etagi_logo" />
                    </div>
                </Header>
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
                        >
                            Создать новую задачу
                        </Button>
                        <ModalWindow
                            visible={showCreateTaskModal}
                            setVisible={setShowCreateTaskModal}
                        />
                        <TasksTable />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Task tracker ©2023 Created by AbdulovDB
                </Footer>
            </Layout>
        </Layout>
    );
};
