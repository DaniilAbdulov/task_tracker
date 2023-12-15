import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Router } from "./Router/Router";
import { ConfigProvider, Flex, Layout, theme } from "antd";
import { observer } from "mobx-react-lite";
import { auth } from "./store/auth";
// import etagi_logo from "./asserts/etagi_logo.webp";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Message } from "./components/UI/Message";
import { tasks } from "./store/tasks";
import { MiniLoader } from "./components/UI/MiniLoader";
const { Header, Footer } = Layout;
export const App = observer(() => {
    const isAuth = auth.isAuth;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const logOut = () => {
        auth.logOut();
        tasks.clearTasksList();
    };
    useEffect(() => {
        auth.authenticateUser();
    }, []);
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainerDisabled: "#f0f0f0",
                        colorTextDisabled: "black",
                    },
                }}
            >
                <Layout style={{ minHeight: "100vh" }}>
                    <Header
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "70px",
                            background: colorBgContainer,
                        }}
                    >
                        <div className="demo-logo">
                            {/* <img src={etagi_logo} alt="" /> */}
                            <img
                                src="https://img.razrisyika.ru/kart/94/372802-logo-6.jpg"
                                alt="Logo"
                            />
                        </div>
                        {isAuth && (
                            <Flex>
                                <p>{auth.userFullName}</p>
                                <div className="demo-logo">
                                    <LogoutOutlined
                                        title="Выйти"
                                        onClick={logOut}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </Flex>
                        )}
                    </Header>
                    <Layout>
                        <div className="App">
                            <Router />
                            <Message />
                            <MiniLoader />
                        </div>
                    </Layout>
                    <Footer style={{ textAlign: "center" }}>
                        Task tracker ©2023 Created by AbdulovDB
                    </Footer>
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    );
});
