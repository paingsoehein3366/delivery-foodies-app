import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import LoginApp from "../component/LoginApp"
import MenuApp from "../component/MenuApp";
import NanBar from "../component/NanBarApp";
import RegisterApp from "../component/RegisterApp"
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={App} />
                <Route path="/login" Component={LoginApp} />
                <Route path="/register" Component={RegisterApp} />
                <Route path="/nanBar" Component={NanBar} />
                <Route path="/menus" Component={MenuApp} />
            </Routes>
        </BrowserRouter>
    )
};
export default Router;