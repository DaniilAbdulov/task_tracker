import React from "react";
import { Flex, Form, Spin } from "antd";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
import { FormFields } from "./FormComponents/FormFields";
import { tasks } from "../store/tasks";
import { compareObjects } from "../functions/compareObjects";

const dateFormat = "DD/MM/YYYY";

export const EditTaskForm = observer(() => {
    // const isDirector = auth.isDirector;
    const isLoading = tasks.taskLoading;
    const taskId = tasks.selectedTask.id;
    const formAvailabale = auth.userFullName === tasks.selectedTask.author;

    // const {
    //     id,
    //     author,
    //     priority,
    //     inspector_id,
    //     inspector_value,
    //     title,
    //     description,
    //     ends_in,
    // } = tasks.selectedTask;
    // const defaultValues = {
    //     inspector_id,
    //     author,
    //     priority,
    //     inspector_value,
    //     title,
    //     description,
    //     ends_in: formattedDate(ends_in),
    // };
    const defaultValues = {
        inspector_id: tasks.selectedTask.inspector_id,
        author: tasks.selectedTask.author,
        priority: tasks.selectedTask.priority,
        inspector_value: tasks.selectedTask.inspector_value,
        title: tasks.selectedTask.title,
        description: tasks.selectedTask.description,
        ends_in: formattedDate(tasks.selectedTask.ends_in),
    };
    const onFinish = (values) => {
        // const correctDate = formattedDate(values.ends_in);
        // const updated_at = formattedDate(new Date());
        const changeOfTask = {
            title: values.title,
            description: values.description,
            // ends_in: correctDate,
            ends_in: values.ends_in,
            priority: values.priority.content,
            inspector_id:
                values.inspector.content === defaultValues.inspector_value
                    ? defaultValues.inspector_id
                    : values.inspector.content,
            updated_at: new Date(),
        };
        const formIsChaged = compareObjects(defaultValues, changeOfTask);
        //функция compareObjects проверяет, изменилось ли хоть одно поле
        //воизбежание отправки неизмененной формы на сервер
        if (formIsChaged) {
            tasks.changeTask(changeOfTask, taskId);
        }
    };

    return (
        <>
            <Form
                name="customized_form_controls"
                requiredMark={false}
                disabled={isLoading || !formAvailabale}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    author: `${defaultValues.author}`,
                    inspector: {
                        content: `${defaultValues.inspector_value}`,
                    },
                    priority: {
                        content: `${defaultValues.priority}`,
                    },
                    title: `${defaultValues.title}`,
                    description: `${defaultValues.description}`,
                    ends_in: dayjs(`${defaultValues.ends_in}`, dateFormat),
                }}
            >
                <FormFields isNewForm={false} />
            </Form>
        </>
    );
});
// const authorDefaultfValue = author;
// const inspectorDefaultfValue = inspector_value;
// const priorityDefaultfValue = priority;
// const titleDefaultfValue = title;
// const descriptionDefaultfValue = description;
// const ends_inDefaultValue = formattedDate(ends_in);
