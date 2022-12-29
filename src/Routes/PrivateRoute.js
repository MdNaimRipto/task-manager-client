import React, { useContext } from 'react';
import { AuthContext } from '../ContextProvider/AuthProvider';
import { useLocation, Navigate } from "react-router-dom"
import Loading from '../pages/shared/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    else {
        return children
    }
};

export default PrivateRoute;