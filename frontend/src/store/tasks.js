import { makeAutoObservable } from "mobx";
// import { API_URL } from "../config";
// import axios from "axios";
class Tasks {
    //данные значения нужно получить с backend
    currentStatus = "К исполнению";
    statusAndDates = [
        {
            id: 0,
            statusTitle: "К исполнению",
            // date: created_at,
            date: "12/12/2023",
        },
        {
            id: 1,
            statusTitle: "Выполняется",
            // date:updated_at,
            date: "14/12/2023",
        },
        {
            id: 2,
            statusTitle: "Выполнено",
            // date:updated_at,
            date: "16/12/2023",
        },
        {
            id: 3,
            statusTitle: "Отменено",
            // date:updated_at,
            date: "15/12/2023",
        },
    ];

    //данные значения нужно получить с backend
    constructor() {
        makeAutoObservable(this);
    }
}
export const tasks = new Tasks();
