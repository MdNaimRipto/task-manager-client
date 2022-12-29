import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Secondary from "../Layout/Secondary";
import AddTask from "../pages/AllPages/AddTask";
import CompletedTasks from "../pages/AllPages/CompletedTasks";
import MyTasks from "../pages/AllPages/MyTasks";
import UpdateTask from "../pages/AllPages/UpdateTask";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import ErrorPage from "../pages/shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><AddTask /></PrivateRoute>
            },
            {
                path: "/addTask",
                element: <PrivateRoute><AddTask /></PrivateRoute>
            },
            {
                path: "/myTasks",
                element: <PrivateRoute><MyTasks /></PrivateRoute>
            },
            {
                path: "completedTasks",
                element: <PrivateRoute><CompletedTasks /></PrivateRoute>
            },
            {
                path: "/updateTask/:id",
                element: <PrivateRoute><UpdateTask /></PrivateRoute>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/updateTask/${params.id}`)
                }
            }
        ]
    },
    {
        path: "/",
        element: <Secondary />,
        errorElement: <ErrorPage />,
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