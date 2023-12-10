import React from "react";
import { priorities } from "../data/priorities";
import { usersNames } from "../data/usersNames";
import { Form, Typography, Flex, DatePicker, Space, Input } from "antd";
import { SelectValues } from "./ModalWindowComponents/SelectValues";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import { ButtonsForModalWindow } from "./ModalWindowComponents/ButtonsForModalWindow";
import { observer } from "mobx-react-lite";
import { formattedDate } from "../functions/formattedDate";
const dateFormat = "DD/MM/YYYY";

const { Text } = Typography;
export const FormTask = observer(({ isNewForm }) => {
    const isDirector = auth.isDirector;
    const onFinish = (values) => {
        const correctDate = formattedDate(values.ends_in);
        if (isNewForm) {
            const newTask = {
                title: values.title,
                description: values.description,
                ends_in: correctDate,
                created_at: formattedDate(),
                updated_at: formattedDate(),
                priority: values.priority.content,
                status: "К исполнению",
                author_id: values.author.content,
                inspector_id: values.inspector.content,
            };
            console.log(newTask);
        } else {
            const changeOfTask = {
                title: values.title,
                description: values.description,
                ends_in: correctDate,
                priority: values.priority.content,
                author_id: values.author.content,
                inspector_id: values.inspector.content,
            };
            console.log(changeOfTask);
        }
    };
    const config = {
        rules: [
            {
                type: "object",
                required: true,
                message: "Выберите время",
            },
        ],
    };
    const authorDefaultfValue = isNewForm ? "" : "Выберите выдающего";
    const inspectorDefaultfValue = isNewForm ? "" : "Выберите ответственного";
    const priorityDefaultfValue = isNewForm ? "" : "Средний";
    const titleDefaultfValue = isNewForm ? "" : "Title of Task";
    const descriptionDefaultfValue = isNewForm
        ? ""
        : "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.";
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
                <Form.Item
                    name="author"
                    label="Кем выдано"
                    rules={[
                        {
                            required: true,
                        },
                        () => ({
                            validator(_, value) {
                                if (value.content) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(`Выберите выдающего`)
                                );
                            },
                        }),
                    ]}
                >
                    <SelectValues optionValues={usersNames} />
                </Form.Item>
                <Form.Item
                    name="inspector"
                    label="Ответственный"
                    rules={[
                        {
                            required: true,
                        },
                        () => ({
                            validator(_, value) {
                                if (value.content) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(`Выберите ответсвенного`)
                                );
                            },
                        }),
                    ]}
                >
                    <SelectValues optionValues={usersNames} />
                </Form.Item>
                <Form.Item
                    name="priority"
                    label="Приоритет"
                    rules={[
                        {
                            required: true,
                        },
                        () => ({
                            validator(_, value) {
                                if (value.content) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(`Выберите приоритет`)
                                );
                            },
                        }),
                    ]}
                >
                    <SelectValues optionValues={priorities} />
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Поручается"
                    rules={[
                        {
                            required: true,
                            message: "Введите название задачи",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Описание задачи"
                    rules={[
                        {
                            required: true,
                            message: "Введите описание задачи",
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={254} />
                </Form.Item>
                <Form.Item name="ends_in" label="Выполнить до" {...config}>
                    <DatePicker format={dateFormat} />
                </Form.Item>
                {isNewForm ? null : (
                    <Form.Item>
                        <Space>
                            <span>
                                <Text strong>Дата изменения: </Text>
                                <Text>2023-12-07</Text>
                            </span>
                            <span>
                                <Text strong>Статус: </Text>
                                <Text>К выполнению</Text>
                            </span>
                        </Space>
                    </Form.Item>
                )}
                <Form.Item>
                    <Flex justify="flex-end">
                        <ButtonsForModalWindow isNewForm={isNewForm} />
                    </Flex>
                </Form.Item>
            </Form>
        </>
    );
});
