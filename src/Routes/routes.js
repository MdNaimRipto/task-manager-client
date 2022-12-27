import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../pages/AllPages/AddTask";

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
            }
        ]
    }
])