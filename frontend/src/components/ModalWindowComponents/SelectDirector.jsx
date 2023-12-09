import { Select, Space } from "antd";
import { Typography } from "antd";
import { observer } from "mobx-react-lite";
import { usersNames } from "../../data/usersNames";
const { Text } = Typography;
export const SelectDirector = observer(({ selectDirectorHandler }) => {
    return (
        <Space>
            <Text strong>Выдано:</Text>
            <Select
                defaultValue="Хусаинов Ильдар Борисович"
                style={{
                    width: 250,
                }}
                onChange={selectDirectorHandler}
                options={usersNames}
            />
        </Space>
    );
});
