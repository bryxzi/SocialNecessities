import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";

function AuthRoute({ children, ...rest }) {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}
export default AuthRoute;

