export const compareDate = (itemTime) => {
    let date_now = new Date();
    const newCurrentDate = itemTime.split("/").reverse().join("-");
    let current_date = new Date(newCurrentDate);
    date_now.setHours(0, 0, 0, 0);
    current_date.setHours(0, 0, 0, 0);
    const dateDiff = (current_date - date_now) / (24 * 60 * 60 * 1000);
    return dateDiff;
};
