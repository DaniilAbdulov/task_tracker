import React, { useEffect } from "react";
import { message } from "antd";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store/tasks";
import { auth } from "../../store/auth";
export const MiniLoader = observer(() => {
    const taskLoading = tasks.taskLoading && tasks.selectedTask?.title;
    const authLoading = auth.isLoading;
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (taskLoading || authLoading) {
            messageApi.open({
                type: "loading",
                duration: 0,
            });
        } else {
            messageApi.destroy();
        }
    }, [taskLoading, authLoading, messageApi]);
    return <>{contextHolder}</>;
});
