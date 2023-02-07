import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ Component }: any) => {
    const isLoggedIn = false;

    return isLoggedIn ? <Component /> : <Navigate to="signin" />;
};

export default Private;
