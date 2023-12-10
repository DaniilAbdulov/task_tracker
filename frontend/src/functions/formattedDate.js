export const formattedDate = (dateFromForm) => {
    const date = dateFromForm ? new Date(dateFromForm) : new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};

// {
//     "author": {
//         "content": "Иванова Анна Владимировна"
//     },
//     "inspector": {
//         "content": "Хусаинов Ильдар Борисович"
//     },
//     "priority": {
//         "content": "Высокий"
//     },
//     "title": "ААА",
//     "description": "sdfsd",
//     "ends_in": "2023-12-31T11:30:46.940Z"
// }
