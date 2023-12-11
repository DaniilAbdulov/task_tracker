import React from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";
import { getItemsForSteps } from "../../functions/getItemsForSteps";
import { tasks } from "../../store/tasks";

export const StatusSteps = observer(() => {
    const myItems = getItemsForSteps(tasks.statusAndDates, tasks.currentStatus);
    console.log(myItems);
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
