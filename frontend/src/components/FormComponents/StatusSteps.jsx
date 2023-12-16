import React from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";
import { getItemsForSteps } from "../../functions/getItemsForSteps";
import { tasks } from "../../store/tasks";

export const StatusSteps = observer(() => {
    const taskStatus = tasks.selectedTask.status;
    const taskChangeDate =
        tasks.selectedTask.status === 1
            ? tasks.selectedTask.created_at
            : tasks.selectedTask.updated_at;
    //Приводим значения статуса задачи к нужному для компонента виду
    const myItems = getItemsForSteps(taskStatus, taskChangeDate);
    return <Steps current={taskStatus - 1} size="small" items={myItems} />;
});
