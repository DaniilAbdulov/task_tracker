import React from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";
import { getItemsForSteps } from "../../functions/getItemsForSteps";
import { tasks } from "../../store/tasks";

const myItems = getItemsForSteps(tasks.statusAndDates, tasks.currentStatus);
export const StatusSteps = observer(() => {
    return (
        <Steps
            size="small"
            current={tasks.statusAndDates.find(
                (item) => item.statusTitle === tasks.currentStatus
            )}
            items={myItems}
        />
    );
});
