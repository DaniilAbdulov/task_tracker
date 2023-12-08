export const compareDate = (itemTime) => {
    let date_now = new Date();
    let current_date = new Date(itemTime);
    date_now.setHours(0, 0, 0, 0);
    current_date.setHours(0, 0, 0, 0);
    return date_now > current_date;
};
