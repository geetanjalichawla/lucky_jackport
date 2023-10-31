// PrivateRoute
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = useSelector((state) => state?.authenticationReducer?.token || localStorage.getItem("bet_token"));
    console.log({ token });
    console.log({ children })
    if (!token || token === 'undefined') {
        return <Navigate to={'/login'} />;
    }
    return children;
};

export default PrivateRoute;