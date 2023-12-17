export const formattedDate = (dateFromForm) => {
    const date = dateFromForm ? new Date(dateFromForm) : new Date();
    const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);
    return formattedDate;
};
