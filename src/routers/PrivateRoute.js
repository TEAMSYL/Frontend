import { NavigateBefore } from '@mui/icons-material';
import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children, isLogin }) => {
    return !isLogin ? <Navigate to='/signin'/> : children;
};

export default PrivateRoute;