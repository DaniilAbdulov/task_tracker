import { Form, Typography, Flex, DatePicker, Space, Input } from "antd";
import { SelectValues } from "./SelectValues";
import { usersNames } from "../../data/usersNames";
import { priorities } from "../../data/priorities";
import { ButtonsForModalWindow } from "./ButtonsForModalWindow";
const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;
const config = {
    rules: [
        {
            type: "object",
            required: true,
            message: "Выберите время",
        },
    ],
};
const isNewForm = true;
export const FormFields = () => {
    return (
        <>
            <Form.Item
                name="author"
                label="Кем выдано"
                rules={[
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
        </>
    );
};
