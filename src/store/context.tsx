import React, { createContext } from 'react';

const GlobalContext = createContext({
    authorization: {},
    adverts: {},
});

export default GlobalContext;
