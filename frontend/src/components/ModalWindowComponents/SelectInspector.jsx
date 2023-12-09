import { Select, Space, Typography } from "antd";
import { usersNames } from "../../data/usersNames";
import { observer } from "mobx-react-lite";
const { Text } = Typography;
export const SelectInspector = observer(({ selectInspectorHandler }) => {
    return (
        <Space>
            <Text strong>Ответсвтенный:</Text>
            <Select
                defaultValue="Иванова Анна Владимировна"
                style={{
                    width: 250,
                }}
                onChange={selectInspectorHandler}
                options={usersNames}
            />
        </Space>
    );
});
