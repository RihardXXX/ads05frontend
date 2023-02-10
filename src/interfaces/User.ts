import { Advert } from './Advert';

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    favorites: Array<Advert> | [];
    adverts: Array<Advert> | [];
    confirmed: boolean;
}
