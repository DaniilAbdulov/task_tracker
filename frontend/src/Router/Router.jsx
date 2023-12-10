import { Routes, Route, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { auth } from "../store/auth";
import { Auth } from "../Pages/Auth";
import { Home } from "../Pages/Home";
import { useEffect } from "react";
import { FormDisabledDemo } from "../components/FormDisabledDemo";

export const Router = observer(() => {
    const isAuth = auth.isAuth;
    const navigate = useNavigate();
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
                {/* {isAuth && <Route path="/home" element={<Home />} />} */}
                {isAuth && (
                    <Route path="/home" element={<FormDisabledDemo />} />
                )}
            </Routes>
        </div>
    );
});
