import { makeAutoObservable } from "mobx";
import { API_URL } from "../config";
import axios from "axios";
class Tasks {
    currentStatus = "";
    statusAndDates = [];
    tasksListFetching = false;
    //
    taskLoading = false;
    selectedTask = {};
    //
    errorMessage = "";
    successMessage = "";
    tasksList = [];
    totalRecords = null;

    constructor() {
        makeAutoObservable(this);
    }
    clearTasksList() {
        this.tasksList = [];
        this.selectedTask = {};
        this.totalRecords = null;
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
            this.totalRecords = res.data.totalRecords;
            this.tasksListFetching = false;
            return res.data;
        } catch (error) {
            this.tasksListFetching = false;
            this.errorMessage = error.response.data.message;
        }
    }
    async getTaskData(taskId) {
        this.selectedTask = {};
        this.taskLoading = true;
        try {
            const res = await axios.get(`${API_URL}/tasks/getTaskData`, {
                params: {
                    taskId,
                },
            });
            this.selectedTask = res.data.selectedTask;
            this.currentStatus = res.data.currentStatus;
            this.statusAndDates = res.data.statusAndDates;
            this.taskLoading = false;
            return res.data;
        } catch (error) {
            this.taskLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
    async changeTaskStatus(taskId, newStatus) {
        try {
            this.taskLoading = true;
            const res = await axios.put(`${API_URL}/tasks/changeTaskStatus`, {
                params: {
                    taskId,
                    newStatus,
                },
            });
            this.successMessage = res.data.message;
            this.taskLoading = false;
        } catch (error) {
            this.taskLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
    async createNewTask(newTask) {
        try {
            this.taskLoading = true;
            const res = await axios.post(`${API_URL}/tasks/createNewTask`, {
                params: {
                    newTask,
                },
            });
            this.successMessage = res.data.message;
            this.taskLoading = false;
        } catch (error) {
            this.taskLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
    async changeTask(newValues, taskId) {
        try {
            this.taskLoading = true;
            const res = await axios.put(`${API_URL}/tasks/changeTask`, {
                params: {
                    newValues,
                    taskId,
                },
            });
            this.successMessage = res.data.message;
            this.taskLoading = false;
        } catch (error) {
            this.taskLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
}
export const tasks = new Tasks();
