import { Select, Space } from "antd";
import { Typography } from "antd";
import { observer } from "mobx-react-lite";
const { Text } = Typography;
export const SelectValues = observer(
    ({ selectValue, defVal, valuesForSelect, title }) => {
        return (
            <Space>
                <Text strong>{title}</Text>
                <Select
                    defaultValue={defVal}
                    style={{
                        width: 250,
                    }}
                    onChange={selectValue}
                    options={valuesForSelect}
                />
            </Space>
        );
    }
);
