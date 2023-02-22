import { Advert } from 'interfaces/Advert';
import {
    initialAllAdverts,
    resetAllAdverts,
    login,
    logout,
} from 'store/actionType';

// adverts
const allAdverts = (payload: [] | Array<Advert>): object => ({
    type: initialAllAdverts,
    payload: payload,
});

const resetAdverts = (): object => ({
    type: resetAdverts,
});

// authorization

const setLogin = (type: 'login', payload: string): object => ({
    type,
    payload,
});

const setLogout = (type: 'logout', payload: ''): object => ({
    type,
    payload,
});

export { allAdverts, resetAdverts, setLogin, setLogout };
