import { makeAutoObservable } from "mobx";
import { API_URL } from "../config";
import axios from "axios";
class Employees {
    isLoading = false;
    errorMessage = "";
    employeesList = [];

    constructor() {
        makeAutoObservable(this);
    }
    clearEmployeesList() {
        this.employeesList = [];
    }
    async getEmployeesList() {
        this.isLoading = true;
        try {
            const res = await axios.get(
                `${API_URL}/employees/getEmployeesList`
            );
            this.employeesList = res.data.employeesList;
            this.isLoading = false;
            return res.data;
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
}
export const employees = new Employees();
