import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Secondary from "../Layout/Secondary";
import AddTask from "../pages/AllPages/AddTask";
import MyTasks from "../pages/AllPages/MyTasks";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <AddTask />
            },
            {
                path: "/addTask",
                element: <AddTask />
            },
            {
                path: "/myTasks",
                element: <MyTasks />
            }
        ]
    },
    {
        path: "/",
        element: <Secondary />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
])