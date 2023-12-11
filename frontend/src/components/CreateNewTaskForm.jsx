import React from "react";
import { Form } from "antd";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
import { FormFields } from "./FormComponents/FormFields";
const dateFormat = "DD/MM/YYYY";

export const CreateNewTaskForm = observer(({ isNewForm }) => {
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
            author_id: 1,
            inspector_id: values.inspector.content,
        };
        console.log(newTask);
    };
    const authorDefaultfValue = "Авторизованный руководитель";
    const ends_inDefaultValue = formattedDate();
    return (
        <>
            <Form
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
