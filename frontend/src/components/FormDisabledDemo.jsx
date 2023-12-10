import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
export const FormDisabledDemo = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <>
            <Checkbox
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>

                <Form.Item label="TextArea">
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </>
    );
};
