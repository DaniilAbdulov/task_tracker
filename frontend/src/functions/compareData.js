//возвращаем разницу дней
export const compareDate = (itemTime) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(
        itemTime.split("/").reverse().join("-")
    ).setHours(0, 0, 0, 0);
    return (selectedDate - today) / (24 * 60 * 60 * 1000);
};
