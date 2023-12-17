import React from "react";
import { Form } from "antd";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
import { FormFields } from "./FormComponents/FormFields";
import { tasks } from "../store/tasks";
import { compareObjects } from "../functions/compareObjects";
const dateFormat = "DD/MM/YYYY";

export const EditTaskForm = observer(() => {
    const isLoading = tasks.taskLoading;
    const taskId = tasks.selectedTask.id;
    //если выдающий задачи не является авторизованным руководителем, то форма не будет доступна
    const formAvailabale = auth.userFullName !== tasks.selectedTask.author;

    const defaultValues = {
        inspector_id: tasks.selectedTask.inspector_id,
        author: tasks.selectedTask.author,
        priority: tasks.selectedTask.priority,
        inspector_value: tasks.selectedTask.inspector_value,
        title: tasks.selectedTask.title,
        description: tasks.selectedTask.description,
        ends_in: formattedDate(tasks.selectedTask.ends_in),
    };
    const defaultPriority =
        defaultValues.priority === 1
            ? "Высокий"
            : defaultValues.priority === 2
            ? "Средний"
            : "Низкий";

    const onFinish = (values) => {
        const changeOfTask = {
            title: values.title,
            description: values.description,
            ends_in: values.ends_in,
            priority:
                values.priority.content === defaultPriority
                    ? defaultValues.priority
                    : values.priority.content,
            inspector_id:
                values.inspector.content === defaultValues.inspector_value
                    ? defaultValues.inspector_id
                    : values.inspector.content,
            updated_at: new Date(),
        };
        //функция compareObjects проверяет, изменилось ли хоть одно поле
        //воизбежание отправки неизмененной формы на сервер
        const formIsChaged = compareObjects(defaultValues, changeOfTask);
        if (formIsChaged) {
            tasks.changeTask(changeOfTask, taskId);
        }
    };

    return (
        <>
            <Form
                name="customized_form_controls"
                requiredMark={false}
                disabled={isLoading || formAvailabale}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    author: `${defaultValues.author}`,
                    inspector: {
                        content: `${defaultValues.inspector_value}`,
                    },
                    priority: {
                        content: `${defaultPriority}`,
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
