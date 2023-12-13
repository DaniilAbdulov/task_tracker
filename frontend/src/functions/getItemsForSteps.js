const processStatuses = [
    { id: 0, val: "process" },
    { id: 1, val: "process" },
    { id: 2, val: "finish" },
    { id: 3, val: "error" },
];

export function getItemsForSteps(arr, currentStatus) {
    const result = arr.map((item) => {
        return {
            title: item.statusTitle,
            description: currentStatus === item.statusTitle ? item.date : "",
            status:
                currentStatus === item.statusTitle
                    ? processStatuses.filter((ps) => ps.id === item.id)[0].val
                    : "",
        };
    });
    return result;
}
