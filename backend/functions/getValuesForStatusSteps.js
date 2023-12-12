const statusAndDates = [
    {
        id: 0,
        statusTitle: "К выполнению",
    },
    {
        id: 1,
        statusTitle: "Выполняется",
    },
    {
        id: 2,
        statusTitle: "Выполнена",
    },
    {
        id: 3,
        statusTitle: "Отменена",
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
