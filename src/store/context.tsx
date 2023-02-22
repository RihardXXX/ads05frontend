import React, { createContext } from 'react';
import { StateAuthorization } from './useAuthorization';

const GlobalContext = createContext({
    authorization: {} as {
        stateAuthorization: StateAuthorization;
        dispatchAuth: any;
    },
    adverts: {},
});

export default GlobalContext;
