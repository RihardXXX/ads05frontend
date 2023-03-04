import { Advert } from 'interfaces/Advert';
import {
    initialAllAdverts,
    // resetAllAdverts,
    // login,
    // logout,
} from 'store/actionType';

// adverts
const allAdverts = (payload: [] | Array<Advert>): object => ({
    type: initialAllAdverts,
    payload: payload,
});

const resetAdverts = (): object => ({
    type: resetAdverts,
});

const updateAdvert = (type: 'updateAdvert', payload: object) => ({
    type,
    payload,
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

const setUser = (type: 'userData', payload: object): object => ({
    type,
    payload,
});

export { allAdverts, resetAdverts, setLogin, setLogout, setUser, updateAdvert };
