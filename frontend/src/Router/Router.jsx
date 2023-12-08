import { Routes, Route } from "react-router-dom";
import { Auth } from "../Pages/Auth";
import { Home } from "../Pages/Home";

export const Router = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="/" element={<Home />} />
                <Route path="/home" element={<Auth />} /> */}
                <Route path="/" element={<Auth />} />

                {/* <Route path="*" element={<Page404 />} /> */}
            </Routes>
        </div>
    );
};
