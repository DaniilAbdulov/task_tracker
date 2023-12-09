import { Modal, Typography, Space, Flex } from "antd";
import { usersNames } from "../../data/usersNames";
import TextArea from "antd/es/input/TextArea";
import { SelectInspector } from "./ModalWindowComponents/SelectInspector";
import { ButtonsForModalWindow } from "./ModalWindowComponents/ButtonsForModalWindow";
import { SelectDirector } from "./ModalWindowComponents/SelectDirector";
import { SelectPriority } from "./ModalWindowComponents/SelectPriority";
import { SelectDate } from "./ModalWindowComponents/SelectDate";
import { InputTitle } from "./ModalWindowComponents/InputTitle";
import { TextAreaDescription } from "./ModalWindowComponents/TextAreaDescription";
import { useState } from "react";
import { SelectValues } from "./ModalWindowComponents/SelectValues";

const { Text } = Typography;
const ModalWindow = ({ visible, setVisible, action = "check" }) => {
    console.log(action);
    const [director, setDirector] = useState("");
    const [inspector, setInspector] = useState("");
    const [priority, setPriority] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const selectDirectorHandler = (value) => {
        console.log(value);
    };
    const selectInspectorHandler = (value) => {
        console.log(value);
    };
    const selectPriorityHandler = (value) => {
        console.log(value);
    };
    const selectDateHandler = (value) => {
        console.log(value);
    };
    const inputTitleHandler = (value) => {
        console.log(value);
    };

    return (
        <div className="modal-window">
            <Modal
                title=""
                footer={null}
                open={visible}
                onCancel={() => setVisible(false)}
            >
                <Space
                    direction="vertical"
                    style={{
                        width: "100%",
                    }}
                >
                    <SelectValues
                        selectorTitle="Выдано"
                        value={director}
                        setValue={setDirector}
                        opt={usersNames}
                    />
                    <SelectDirector
                        selectDirectorHandler={selectDirectorHandler}
                    />
                    <SelectInspector
                        selectInspectorHandler={selectInspectorHandler}
                    />
                    <SelectPriority
                        selectPriorityHandler={selectPriorityHandler}
                    />
                    <InputTitle
                        value={"Title"}
                        inputTitleHandler={inputTitleHandler}
                    />
                    <TextAreaDescription />

                    <span>
                        <Text strong>Срок исполнения:</Text>{" "}
                        <SelectDate selectDateHandler={selectDateHandler} />
                    </span>
                    <span>
                        <Text strong>Дата изменения: </Text>
                        <Text>2023-12-07</Text>
                    </span>
                    <span>
                        <Text strong>Статус: </Text>
                        <Text>К выполнению</Text>
                    </span>
                    <Flex justify="flex-end">
                        <ButtonsForModalWindow setVisible={setVisible} />
                    </Flex>
                </Space>
            </Modal>
        </div>
    );
};
export default ModalWindow;
