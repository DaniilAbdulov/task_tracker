import { Modal, Typography, Space, Flex } from "antd";
import { usersNames } from "./../data/usersNames";
import { priorities } from "./../data/priorities";
import { ButtonsForModalWindow } from "./ModalWindowComponents/ButtonsForModalWindow";
import { SelectValues } from "./ModalWindowComponents/SelectValues";
import { SelectDate } from "./ModalWindowComponents/SelectDate";
import { InputTitle } from "./ModalWindowComponents/InputTitle";
import { TextAreaDescription } from "./ModalWindowComponents/TextAreaDescription";
const { Text } = Typography;

const ModalWindow = ({ visible, setVisible, action = "check" }) => {
    console.log(action);
    // const [director, setDirector] = useState("");
    // const [inspector, setInspector] = useState("");
    // const [priority, setPriority] = useState("");
    // const [date, setDate] = useState("");
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
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
    const directorDefaultfValue = "Абдулов Директор Директорович";
    const inspectorDefaultfValue = "Абдулов Инспектор Инспекторович";
    const priorityDefaultfValue = "Приоритет";
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
                        defVal={directorDefaultfValue}
                        selectValue={selectDirectorHandler}
                        valuesForSelect={usersNames}
                        title="Выдано:"
                    />
                    <SelectValues
                        defVal={inspectorDefaultfValue}
                        selectValue={selectInspectorHandler}
                        valuesForSelect={usersNames}
                        title="Ответственный:"
                    />
                    <SelectValues
                        defVal={priorityDefaultfValue}
                        selectValue={selectPriorityHandler}
                        valuesForSelect={priorities}
                        title="Приоритет:"
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
