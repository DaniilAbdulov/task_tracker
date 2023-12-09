import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Router } from "./Router/Router";
import { Layout, theme } from "antd";
import { observer } from "mobx-react-lite";
import { auth } from "./store/auth";
import etagi_logo from "./asserts/etagi_logo.webp";
import { LogoutOutlined } from "@ant-design/icons";
const { Header, Footer } = Layout;
export const App = observer(() => {
    const isAuth = auth.isAuth;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const logOut = () => {
        auth.changeIsAuth();
    };
    return (
        <BrowserRouter>
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
                        <img src={etagi_logo} alt="" />
                    </div>
                    {isAuth && (
                        <div className="demo-logo">
                            <LogoutOutlined
                                title="Выйти"
                                onClick={logOut}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    )}
                </Header>
                <Layout>
                    <div className="App">
                        <Router />
                    </div>
                </Layout>
                <Footer style={{ textAlign: "center" }}>
                    Task tracker ©2023 Created by AbdulovDB
                </Footer>
            </Layout>
        </BrowserRouter>
    );
});
