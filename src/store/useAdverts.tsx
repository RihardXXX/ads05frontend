import React, { useReducer } from 'react';

interface StateAdverts {
    allAdverts: Array<any>;
    favoriteAdverts: Array<any>;
    myAdverts: Array<any>;
}

interface ActionAdverts {
    type: string;
    payload?: any;
}

const initialState = {
    allAdverts: [],
    favoriteAdverts: [],
    myAdverts: [],
};

const reducer = (state: StateAdverts, action: ActionAdverts) => {
    switch (action.type) {
        case 'ADD_ALL_ADVERTS':
            return {
                ...state,
                allAdverts: [...state.allAdverts, action.payload],
            };
        default:
            return state;
    }
};

const useAdverts = () => {
    const [stateAdverts, dispatch] = useReducer(reducer, initialState);

    return {
        stateAdverts,
        dispatch,
    };
};

export default useAdverts;
