import React, { useState } from "react";
import { Form } from "antd";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
import { FormFields } from "./FormComponents/FormFields";

const dateFormat = "DD/MM/YYYY";

export const CreateNewTaskForm = observer(({ isNewForm }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const isDirector = auth.isDirector;
    const onFinish = (values) => {
        const correctDate = formattedDate(values.ends_in);
        const newTask = {
            title: values.title,
            description: values.description,
            ends_in: correctDate,
            created_at: formattedDate(),
            updated_at: formattedDate(),
            priority: values.priority.content,
            status: "К исполнению",
            //id авторизованного руководителя
            author_id: auth.userId,
            inspector_id: values.inspector.content,
        };
        console.log(newTask);
        form.resetFields();
    };

    const authorDefaultfValue = auth.userFullName;
    const ends_inDefaultValue = formattedDate();
    return (
        <>
            <Form
                form={form}
                name="customized_form_controls"
                disabled={!isDirector}
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
                    ends_in: dayjs(`${ends_inDefaultValue}`, dateFormat),
                }}
            >
                <FormFields isNewForm={true} />
            </Form>
        </>
    );
});
