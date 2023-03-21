import React, { useReducer, useCallback } from 'react';
import { login, logout, userData } from 'store/actionType';

export interface User {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    confirmed: boolean;
}

export interface ActionAuthorization {
    type: 'login' | 'logout' | 'userData';
    payload: any;
}

export interface StateAuthorization {
    isLoggedIn: boolean;
    token?: string;
    user?: User;
}

const initialState: StateAuthorization = {
    isLoggedIn: false,
    token: '',
    user: undefined,
};

const reducer = (state: StateAuthorization, action: ActionAuthorization) => {
    switch (action.type) {
        case login:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload?.user,
            };
        case logout:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                user: undefined,
            };
        case userData:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

const useAuthorization = () => {
    // auto auth
    const setInitialState = useCallback((): StateAuthorization => {
        const token = localStorage.getItem('token');

        if (!token) {
            return initialState;
        } else {
            return {
                ...initialState,
                isLoggedIn: true,
                token: token,
            };
        }
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
