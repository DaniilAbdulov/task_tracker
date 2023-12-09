import React from "react";
import { Button, Flex, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import Title from "antd/es/typography/Title";

const onFinish = (values) => {
    console.log("Success:", values);
    auth.changeIsAuth();
};
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

export const Auth = observer(() => {
    return (
        <Flex
            justify="center"
            align="center"
            style={{ minHeight: "100vh" }}
            vertical="true"
            className="auth-form"
        >
            <Form
                align="center"
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size="large"
                style={{
                    background: "white",
                    padding: "5px",
                    borderRadius: "10px",
                }}
            >
                <Title level={3}>Task Tracker</Title>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваш логин!",
                            min: 2,
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Логин"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваш пароль!",
                            min: 2,
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
});
