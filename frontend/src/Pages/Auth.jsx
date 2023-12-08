import React from "react";
import { Button, Form, Input } from "antd";
const onFinish = (values) => {
    console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
export const Auth = () => (
    <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Логин"
            name="login"
            rules={[
                {
                    required: true,
                    message: "Введите ваш логин",
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Пароль"
            name="password"
            rules={[
                {
                    required: true,
                    message: "Введите ваш пароль",
                },
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Войти
            </Button>
        </Form.Item>
    </Form>
);
