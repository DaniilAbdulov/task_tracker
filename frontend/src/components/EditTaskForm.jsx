import React from "react";
import { Form } from "antd";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
import { FormFields } from "./FormComponents/FormFields";
const dateFormat = "DD/MM/YYYY";

export const EditTaskForm = observer(({ isNewForm }) => {
    const isDirector = auth.isDirector;
    const onFinish = (values) => {
        const correctDate = formattedDate(values.ends_in);

        const changeOfTask = {
            title: values.title,
            description: values.description,
            ends_in: correctDate,
            priority: values.priority.content,
            author_id: values.author.content,
            inspector_id: values.inspector.content,
        };
        console.log(changeOfTask);
    };

    const authorDefaultfValue = "Выберите выдающего";
    const inspectorDefaultfValue = "Выберите ответственного";
    const priorityDefaultfValue = "Средний";
    const titleDefaultfValue = "Title of Task";
    const descriptionDefaultfValue =
        "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.";
    const ends_inDefaultValue = formattedDate();
    return (
        <>
            <Form
                name="customized_form_controls"
                disabled={!isDirector}
                layout="horizontal"
                onFinish={onFinish}
                initialValues={{
                    author: {
                        content: `${authorDefaultfValue}`,
                    },
                    inspector: {
                        content: `${inspectorDefaultfValue}`,
                    },
                    priority: {
                        content: `${priorityDefaultfValue}`,
                    },
                    title: `${titleDefaultfValue}`,
                    description: `${descriptionDefaultfValue}`,
                    ends_in: dayjs(`${ends_inDefaultValue}`, dateFormat),
                }}
            >
                <FormFields />
            </Form>
        </>
    );
});
