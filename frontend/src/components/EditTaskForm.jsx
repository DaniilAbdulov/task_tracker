import React from "react";
import { Flex, Form, Spin } from "antd";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
import { FormFields } from "./FormComponents/FormFields";
import { tasks } from "../store/tasks";

const dateFormat = "DD/MM/YYYY";

export const EditTaskForm = observer(() => {
    const isDirector = auth.isDirector;
    // const selectedTask = tasks.selectedTask;
    const changeTaskDataLoading = tasks.changeTaskDataLoading;
    const {
        id,
        author,
        priority,
        inspector_id,
        inspector_value,
        title,
        description,
        ends_in,
    } = tasks.selectedTask;

    const onFinish = (values) => {
        const correctDate = formattedDate(values.ends_in);
        const changeOfTask = {
            id,
            title: values.title,
            description: values.description,
            ends_in: correctDate,
            priority: values.priority.content,
            inspector_id:
                values.inspector.content === inspector_value
                    ? inspector_id
                    : values.inspector.content,
        };
        console.log(changeOfTask);
    };

    const authorDefaultfValue = author;
    const inspectorDefaultfValue = inspector_value;
    const priorityDefaultfValue = priority;
    const titleDefaultfValue = title;
    const descriptionDefaultfValue = description;
    const ends_inDefaultValue = formattedDate(ends_in);
    return (
        <>
            <Form
                name="customized_form_controls"
                requiredMark={false}
                disabled={!isDirector || changeTaskDataLoading}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    author: `${authorDefaultfValue}`,
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
                <FormFields isNewForm={false} />
            </Form>
        </>
    );
});
