import React, { useReducer } from 'react';
import { Advert } from 'interfaces/Advert';
import { initialAllAdverts, resetAllAdverts } from 'store/actionType';

interface StateAdverts {
    allAdverts: Array<Advert> | [];
    favoriteAdverts: Array<Advert> | [];
    myAdverts: Array<Advert> | [];
    advert: Advert | null;
}

interface ActionAdverts {
    type: string;
    payload: any;
}

const initialState: StateAdverts = {
    allAdverts: [],
    favoriteAdverts: [],
    myAdverts: [],
    advert: null,
};

const reducer = (state: StateAdverts, action: ActionAdverts) => {
    switch (action.type) {
        case initialAllAdverts:
            return {
                ...state,
                allAdverts: [...state.allAdverts, ...action.payload],
            };
        case resetAllAdverts:
            return {
                ...state,
                allAdverts: [],
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
