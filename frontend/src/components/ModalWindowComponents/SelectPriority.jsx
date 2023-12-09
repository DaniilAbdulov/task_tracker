import { Select, Space, Typography } from "antd";
import { priorities } from "../../data/priorities";
import { observer } from "mobx-react-lite";
const { Text } = Typography;
export const SelectPriority = observer(({ selectPriorityHandler }) => {
    return (
        <Space>
            <Text strong>Приоритет:</Text>{" "}
            <Select
                defaultValue="Средний"
                style={{
                    width: 100,
                }}
                onChange={selectPriorityHandler}
                options={priorities}
            />
        </Space>
    );
});
