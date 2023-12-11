import { Form, Flex, DatePicker, Input } from "antd";
import { SelectValues } from "./SelectValues";
import { usersNames } from "../../data/usersNames";
import { priorities } from "../../data/priorities";
import { ButtonsForModalWindow } from "./ButtonsForModalWindow";
import { StatusSteps } from "./StatusSteps";
const dateFormat = "DD/MM/YYYY";

const config = {
    rules: [
        {
            type: "object",
            required: true,
            message: "Выберите время",
        },
    ],
};

export const FormFields = ({ isNewForm }) => {
    return (
        <>
            <Form.Item name="author" label="Кем выдано">
                <Input style={{ width: "250px" }} disabled />
            </Form.Item>
            <Flex justify="space-between">
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
            </Flex>
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
            {!isNewForm && <StatusSteps />}
            <Form.Item>
                <Flex justify="flex-end">
                    <ButtonsForModalWindow isNewForm={isNewForm} />
                </Flex>
            </Form.Item>
        </>
    );
};
