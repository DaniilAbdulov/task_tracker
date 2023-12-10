import { makeAutoObservable } from "mobx";
// import { API_URL } from "../config";
// import axios from "axios";
class Auth {
    // isDirector = true;
    // isEmployee = false;
    isDirector = false;
    isEmployee = true;
    isAuth = true;
    userRole = "";
    isLoading = false;
    constructor() {
        makeAutoObservable(this);
    }
    changeIsAuth() {
        this.isAuth = !this.isAuth;
    }
    // async searchAuth(email, number) {
    //     //активируем индикатор загрузки, очищаем массив значений
    //     this.isLoading = true;
    //     this.Auth = [];
    //     try {
    //         const response = await axios.get(`${API_URL}search/Auth`, {
    //             params: {
    //                 email,
    //                 number,
    //             },
    //         });
    //         //информируем, что в будущем это будет уже не первый запрос
    //         this.thisIsFirstFetch = false;
    //         //записываем новый массив
    //         this.Auth = response.data.items;
    //         //ДЕактивируем индикатор загрузки
    //         this.isLoading = false;
    //     } catch (error) {
    //         //ДЕактивируем индикатор загрузки в случае ошибки
    //         this.isLoading = false;
    //         console.log(error);
    //     }
    // }
}
export const auth = new Auth();
