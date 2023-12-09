import { Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react-lite";
const { Text } = Typography;
export const TextAreaDescription = observer(() => {
    return (
        <Space
            direction="vertical"
            style={{
                width: "100%",
            }}
        >
            <Text strong>Описание задачи:</Text>
            <TextArea
                value={
                    "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit."
                }
            />
        </Space>
    );
});
