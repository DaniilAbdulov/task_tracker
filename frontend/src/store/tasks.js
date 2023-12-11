import { makeAutoObservable } from "mobx";
import { API_URL } from "../config";
import axios from "axios";
class Tasks {
    currentStatus = "";
    statusAndDates = [];
    tasksListFetching = false;
    taskDataFetching = false;
    taskDataIsAvailable = false;
    changeTaskDataLoading = false;
    errorMessage = "";
    successMessage = "";
    tasksList = [];
    selectedTask = {};

    constructor() {
        makeAutoObservable(this);
    }
    clearTasksList() {
        this.tasksList = [];
        this.selectedTask = {};
        this.taskDataIsAvailable = false;
    }
    clearMessage() {
        if (this.successMessage) {
            this.successMessage = "";
        } else if (this.errorMessage) {
            this.errorMessage = "";
        }
    }
    async getTasksList(page, pageSize) {
        this.tasksListFetching = true;
        try {
            const res = await axios.get(`${API_URL}/tasks/getTasksList`, {
                params: {
                    page,
                    pageSize,
                },
            });
            this.tasksList = res.data.tasksList;
            this.tasksListFetching = false;
            return res.data;
        } catch (error) {
            this.tasksListFetching = false;
            this.errorMessage = error.response.data.message;
        }
    }
    async getTaskData(taskId) {
        this.selectedTask = {};
        this.taskDataFetching = true;
        this.taskDataIsAvailable = false;
        try {
            const res = await axios.get(`${API_URL}/tasks/getTaskData`, {
                params: {
                    taskId,
                },
            });
            this.selectedTask = res.data.selectedTask;
            this.taskDataIsAvailable = true;
            this.taskDataFetching = false;
            this.currentStatus = res.data.currentStatus;
            this.statusAndDates = res.data.statusAndDates;
            return res.data;
        } catch (error) {
            this.taskDataFetching = false;
            this.taskDataIsAvailable = false;
            this.errorMessage = error.response.data.message;
        }
    }
    async changeTaskStatus(taskId, newStatus) {
        try {
            this.changeTaskDataLoading = true;
            const res = await axios.put(`${API_URL}/tasks/changeTaskStatus`, {
                params: {
                    taskId,
                    newStatus,
                },
            });
            this.successMessage = res.data.message;
            this.taskDataIsAvailable = false;
            this.changeTaskDataLoading = false;
        } catch (error) {
            this.changeTaskDataLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
}
export const tasks = new Tasks();
