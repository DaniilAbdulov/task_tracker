import React, { useEffect } from "react";
import { Form } from "antd";
import { auth } from "../store/auth";
import { observer } from "mobx-react-lite";
import { FormFields } from "./FormComponents/FormFields";
import { tasks } from "../store/tasks";

export const CreateNewTaskForm = observer(() => {
    const [form] = Form.useForm();
    const isLoading = tasks.taskLoading;
    const formCreated = tasks.successMessage || tasks.errorMessage;
    const onFinish = (values) => {
        const newTask = {
            title: values.title,
            description: values.description,
            ends_in: values.ends_in,
            created_at: new Date(),
            updated_at: new Date(),
            priority: values.priority.content,
            status: 1,
            author_id: auth.userId,
            inspector_id: values.inspector.content,
        };
        tasks.createNewTask(newTask);
    };
    useEffect(() => {
        if (formCreated) {
            form.resetFields();
        }
    }, [formCreated, form]);
    const authorDefaultfValue = auth.userFullName;
    return (
        <>
            <Form
                form={form}
                name="customized_form_controls"
                disabled={isLoading}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    author: `${authorDefaultfValue}`,
                    inspector: {
                        content: ``,
                    },
                    priority: {
                        content: ``,
                    },
                    title: ``,
                    description: ``,
                    ends_in: ``,
                }}
            >
                <FormFields isNewForm={true} />
            </Form>
        </>
    );
});
