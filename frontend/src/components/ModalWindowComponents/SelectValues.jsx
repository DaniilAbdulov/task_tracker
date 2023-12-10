import React, { useState } from "react";
import { Select, Space } from "antd";
import { observer } from "mobx-react-lite";

const { Option } = Select;
export const SelectValues = observer(
    ({ value = {}, onChange, optionValues }) => {
        const [currency, setCurrency] = useState("");

        const triggerChange = (changedValue) => {
            onChange?.({
                currency,
                ...value,
                ...changedValue,
            });
        };

        const onCurrencyChange = (newCurrency) => {
            if (!("currency" in value)) {
                setCurrency(newCurrency);
            }
            triggerChange({
                currency: newCurrency,
            });
        };

        return (
            <Space>
                <Select
                    value={value.currency || currency}
                    onChange={onCurrencyChange}
                    style={{ minWidth: 250 }}
                >
                    {optionValues.map((item) => {
                        return (
                            <Option key={item.id} value={item.value}>
                                {item.value}
                            </Option>
                        );
                    })}
                </Select>
            </Space>
        );
    }
);
