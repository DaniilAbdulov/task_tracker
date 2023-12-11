const statusAndDates = [
    {
        id: 0,
        statusTitle: "К исполнению",
    },
    {
        id: 1,
        statusTitle: "Выполняется",
    },
    {
        id: 2,
        statusTitle: "Выполнено",
    },
    {
        id: 3,
        statusTitle: "Отменено",
    },
];

export const getValuesForStatusSteps = (created, updated) => {
    const newArr = [];
    for (let i = 0; i < statusAndDates.length; i++) {
        const newObj = {
            id: i,
            statusTitle: statusAndDates[i].statusTitle,
            date: i === 0 ? created : updated,
        };
        newArr.push(newObj);
    }
    return newArr;
};
