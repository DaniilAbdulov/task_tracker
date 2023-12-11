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
    isFetchingTokenLoading = false;
    successMessage = "";
    errorMessage = "";
    userFullName = "";
    userId = null;
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
        this.userFullName = "";
        this.userId = null;
        localStorage.removeItem("bgtrackerjwt");
        initializeAxiosHeaders(null);
    }
    async authenticateUser() {
        const token = localStorage.getItem("bgtrackerjwt");
        initializeAxiosHeaders(token);
        if (token) {
            try {
                this.isFetchingTokenLoading = true;
                const res = await axios.get(`${API_URL}/auth`);
                const userRole = res.data.user.role;
                this.isAuth = true;
                if (userRole === "director") {
                    this.isDirector = true;
                } else {
                    this.isEmployee = true;
                }
                this.isFetchingTokenLoading = false;
                return res.data;
            } catch (error) {
                this.isFetchingTokenLoading = false;
                console.log(error);
            }
        }
    }
    async loginUser(candidat) {
        this.isLoading = true;
        try {
            const res = await axios.post(`${API_URL}/auth/login`, candidat);
            console.log(res.data);
            const loggedUser = res.data.user;
            const userRole = loggedUser.role;
            this.isAuth = true;
            if (userRole === "director") {
                this.isDirector = true;
            } else {
                this.isEmployee = true;
            }
            this.userId = loggedUser.id;
            this.userFullName = loggedUser.full_name;
            this.isLoading = false;
            this.successMessage = "Вход выполнен успешно";
            const token = res.data.token;
            localStorage.setItem("bgtrackerjwt", token);
            initializeAxiosHeaders(token);
            return res.data;
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
}
export const auth = new Auth();
