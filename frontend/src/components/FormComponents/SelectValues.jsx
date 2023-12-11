import React, { useState } from "react";
import { Select, Space } from "antd";
import { observer } from "mobx-react-lite";

const { Option } = Select;
export const SelectValues = observer(
    ({ value = {}, onChange, optionValues }) => {
        const isUsersArray = optionValues[0].value;
        const [content, setContent] = useState("");

        const triggerChange = (changedValue) => {
            onChange?.({
                content,
                ...value,
                ...changedValue,
            });
        };
        const onContentChange = (newContent) => {
            if (!newContent) {
                console.log("Значение пустое");
            }
            if (!("content" in value)) {
                setContent(newContent);
            }
            triggerChange({
                content: newContent,
            });
        };

        return (
            <Space>
                <Select
                    value={value.content || content}
                    onChange={onContentChange}
                    style={{ minWidth: 250 }}
                >
                    {optionValues.map((item) => {
                        return (
                            <Option
                                key={item.id}
                                value={isUsersArray ? item.id : item.value}
                            >
                                {item.value}
                            </Option>
                        );
                    })}
                </Select>
            </Space>
        );
    }
);
