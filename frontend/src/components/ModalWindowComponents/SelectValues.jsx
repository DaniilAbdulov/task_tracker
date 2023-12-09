import { Select, Space, Typography } from "antd";
import { priorities } from "../../data/priorities";
import { observer } from "mobx-react-lite";
const { Text } = Typography;
export const SelectValues = observer(
    ({ value, setValue, selectorTitle, action, opt }) => {
        console.log(action);
        console.log(opt);
        return (
            <Space>
                <Text strong>{selectorTitle}:</Text>{" "}
                <Select
                    defaultValue={value}
                    style={{
                        width: 100,
                    }}
                    onChange={setValue}
                    options={opt}
                />
            </Space>
        );
    }
);
