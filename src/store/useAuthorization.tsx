import React, { useReducer, useCallback } from 'react';
import { login, logout } from 'store/actionType';

export interface ActionAuthorization {
    type: 'login' | 'logout';
    payload: string | '';
}

export interface StateAuthorization {
    isLoggedIn: boolean;
    token?: string;
}

const initialState: StateAuthorization = {
    isLoggedIn: false,
    token: '',
};

const reducer = (state: StateAuthorization, action: ActionAuthorization) => {
    switch (action.type) {
        case login:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload,
            };
        case logout:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoggedIn: false,
                token: '',
            };
        default:
            return state;
    }
};

const useAuthorization = () => {
    // auto auth
    const setInitialState = useCallback((): StateAuthorization => {
        const token = localStorage.getItem('token');

        return !token
            ? initialState
            : {
                  ...initialState,
                  isLoggedIn: true,
                  token: token,
              };
    }, [localStorage.getItem('token')]);

    const [stateAuthorization, dispatchAuth] = useReducer(
        reducer,
        setInitialState()
    );

    return {
        stateAuthorization,
        dispatchAuth,
    };
};

export default useAuthorization;
