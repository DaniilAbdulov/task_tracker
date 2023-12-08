import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import "./components/Home/Task.scss";
import { Router } from "./Router/Router";

export const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Router />
            </div>
        </BrowserRouter>
    );
};
