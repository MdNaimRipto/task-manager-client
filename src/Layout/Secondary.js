import React from 'react';
import { Outlet } from "react-router-dom";

const Secondary = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Secondary;