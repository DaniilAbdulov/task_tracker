import { Space, Typography } from "antd";
import Input from "antd/es/input/Input";
import { observer } from "mobx-react-lite";
const { Text } = Typography;
export const InputTitle = observer(({ value, inputTitleHandler }) => {
    return (
        <Space
            direction="vertical"
            style={{
                width: "100%",
            }}
        >
            <Text strong>К исполнению:</Text>
            <Input value={value} onChange={inputTitleHandler} />
        </Space>
    );
});
