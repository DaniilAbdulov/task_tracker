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
    loggedUser(user) {
        this.isAuth = true;
        if (user.role === "director") {
            this.isDirector = true;
        } else {
            this.isEmployee = true;
        }
        this.userId = user.id;
        this.userFullName = user.full_name;
    }
    async authenticateUser() {
        const token = localStorage.getItem("bgtrackerjwt");
        initializeAxiosHeaders(token);
        if (token) {
            try {
                this.isFetchingTokenLoading = true;
                const res = await axios.get(`${API_URL}/auth`);
                this.loggedUser(res.data.user);
                this.isFetchingTokenLoading = false;
                return res.data;
            } catch (error) {
                this.isFetchingTokenLoading = false;
                console.log(error.message);
            }
        }
    }
    async loginUser(candidat) {
        this.isLoading = true;
        try {
            const res = await axios.post(`${API_URL}/auth/login`, candidat);
            this.loggedUser(res.data.user);
            this.isLoading = false;
            const token = res.data.token;
            localStorage.setItem("bgtrackerjwt", token);
            initializeAxiosHeaders(token);
            this.successMessage = "Вход выполнен успешно";
            return res.data;
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = error.response.data.message;
        }
    }
}
export const auth = new Auth();
