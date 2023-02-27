import React, { createContext } from 'react';
import { StateAuthorization } from './useAuthorization';

const GlobalContext = createContext({
    authorization: {} as {
        stateAuthorization: StateAuthorization;
        dispatchAuth: any;
    },
    adverts: {},
    header: {} as {
        headerName: string | undefined;
        setHeader: any;
    },
});

export default GlobalContext;
