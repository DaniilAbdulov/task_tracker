import React from "react";
import { priorities } from "../data/priorities";
import { usersNames } from "../data/usersNames";
import { Form, Typography, Flex, DatePicker, Space, Input } from "antd";
import { SelectValues } from "./ModalWindowComponents/SelectValues";
import { auth } from "../store/auth";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { ButtonsForModalWindow } from "./ModalWindowComponents/ButtonsForModalWindow";
import { observer } from "mobx-react-lite";
const dateFormat = "YYYY-MM-DD";

const { Text } = Typography;
export const FormTask = observer(({ isNewForm }) => {
    const isDirector = auth.isDirector;
    const onFinish = (values) => {
        console.log("Received values from form: ", values);
    };
    const ex = isNewForm;
    const directorDefaultfValue = ex ? "" : "Абдулов Директор Директорович";
    const inspectorDefaultfValue = ex ? "" : "Абдулов Инспектор Инспекторович";
    const priorityDefaultfValue = ex ? "" : "Средний";
    const titleDefaultfValue = ex ? "" : "Title of Task";
    const descriptionDefaultfValue = ex
        ? ""
        : "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.";
    const ends_inDefaultValue = new Date();
    return (
        <>
            <Form
                name="customized_form_controls"
                disabled={!isDirector}
                layout="horizontal"
                onFinish={onFinish}
                initialValues={{
                    director: {
                        currency: `${directorDefaultfValue}`,
                    },
                    inspector: {
                        currency: `${inspectorDefaultfValue}`,
                    },
                    priority: {
                        currency: `${priorityDefaultfValue}`,
                    },
                    title: `${titleDefaultfValue}`,
                    description: `${descriptionDefaultfValue}`,
                    ends_in: dayjs(`${ends_inDefaultValue}`, dateFormat),
                }}
            >
                <Form.Item name="director" label="Кем выдано">
                    <SelectValues optionValues={usersNames} />
                </Form.Item>
                <Form.Item name="inspector" label="Ответственный">
                    <SelectValues optionValues={usersNames} />
                </Form.Item>
                <Form.Item name="priority" label="Приоритет">
                    <SelectValues optionValues={priorities} />
                </Form.Item>
                <Form.Item name="title" label="Поручается">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Описание задачи">
                    <TextArea />
                </Form.Item>
                <Form.Item name="ends_in" label="Выполнить до">
                    <DatePicker format={dateFormat} />
                </Form.Item>
                {ex ? (
                    ""
                ) : (
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
                        <ButtonsForModalWindow isNewForm={ex} />
                    </Flex>
                </Form.Item>
            </Form>
        </>
    );
});
