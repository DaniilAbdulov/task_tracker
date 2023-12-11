import { makeAutoObservable } from "mobx";
import { API_URL } from "../config";
import axios from "axios";

const initializeAxiosHeaders = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};
class Auth {
    isEmployee = false;
    isDirector = false;
    isAuth = false;
    isLoading = false;
    successMessage = "";
    errorMessage = "";
    constructor() {
        makeAutoObservable(this);
    }
    changeIsAuth() {
        this.isAuth = !this.isAuth;
    }
    clearMessage() {
        if (this.successMessage) {
            this.successMessage = "";
        } else if (this.errorMessage) {
            this.errorMessage = "";
        }
    }
    logOut() {
        this.isAuth = false;
        this.isEmployee = false;
        this.isDirector = false;
        localStorage.removeItem("bgtrackerjwt");
        initializeAxiosHeaders(null);
    }
    async authenticateUser() {
        const token = localStorage.getItem("bgtrackerjwt");
        initializeAxiosHeaders(token);
        if (token) {
            try {
                const res = await axios.get(`${API_URL}/user/auth`);

                return res.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
    async loginUser(candidat) {
        this.isLoading = true;
        try {
            const res = await axios.post(`${API_URL}/user/login`, candidat);
            console.log(res.data);
            const userRole = res.data.user.role;
            this.isAuth = true;
            if (userRole === "director") {
                this.isDirector = true;
            } else {
                this.isEmployee = true;
            }
            this.isLoading = false;
            this.successMessage = "Вход выполнен успешно";
            return res.data;
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
}
export const auth = new Auth();
