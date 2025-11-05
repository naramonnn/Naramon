import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';
const AuthGuard = ({children}) => {
    const {user} = useAuth();
    if (!user) return <Navigate to="/login"/>;
    return children;
};
AuthGuard.propTypes = {
    children: PropTypes.node
};
export default AuthGuard;