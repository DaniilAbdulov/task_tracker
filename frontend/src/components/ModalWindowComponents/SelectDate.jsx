import { DatePicker } from "antd";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
const dateFormat = "YYYY-MM-DD";

export const SelectDate = observer(({ selectDateHandler }) => {
    return (
        <DatePicker
            onChange={selectDateHandler}
            defaultValue={dayjs("2015-06-06", dateFormat)}
            // disabled
        />
    );
});
