import { User } from './User';

export interface Advert {
    _id: string;
    author: User;
    name: string;
    category: string;
    content: string;
    contact: string;
    favoriteCount: number;
    favoritedBy: Array<User> | [];
    watch: number;
    createdAt: string;
    updatedAt: string;
}
