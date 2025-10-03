import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default AuthRoute