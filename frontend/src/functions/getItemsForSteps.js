import { formattedDate } from "./formattedDate.js";
const processStatuses = [
    { id: 1, val: "process", title: "К выполнению" },
    { id: 2, val: "process", title: "Выполняется" },
    { id: 3, val: "finish", title: "Выполнено" },
    { id: 4, val: "error", title: "Отменено" },
];

export function getItemsForSteps(taskStatus, taskChangeDate) {
    const result = processStatuses.map((item) => {
        return {
            title: item.title,
            description:
                taskStatus === item.id ? formattedDate(taskChangeDate) : "",
            status:
                taskStatus === item.id
                    ? processStatuses.filter((ps) => ps.id === item.id)[0].val
                    : "",
        };
    });
    return result;
}
