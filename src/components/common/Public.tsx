import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalContext from 'store/context';

const Public = ({ Component }: any) => {
    const {
        authorization: { stateAuthorization },
    } = useContext(GlobalContext);

    const isLoggedIn = stateAuthorization.isLoggedIn;

    return !isLoggedIn ? <Component /> : <Navigate to="/" />;
};

export default Public;
