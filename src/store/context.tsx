import React, { createContext } from 'react';

const GlobalContext = createContext({
    authorization: {},
    adverts: {},
    loading: {},
});

export default GlobalContext;
