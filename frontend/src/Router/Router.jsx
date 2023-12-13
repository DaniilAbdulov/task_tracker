import { Routes, Route, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { Auth } from "../Pages/Auth";
import { Home } from "../Pages/Home";
import { useEffect } from "react";

export const Router = observer(() => {
    const isAuth = auth.isAuth;
    const navigate = useNavigate();
    //     При любой попытке доступа к системе пользователю сперва
    // требуется пройти процесс авторизации.
    // пользователь может получить доступ к приложению только
    // после авторизации;

    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        } else {
            navigate("/");
        }
    }, [navigate, isAuth]);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Auth />} />
                {isAuth && <Route path="/home" element={<Home />} />}
            </Routes>
        </div>
    );
});
