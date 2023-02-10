import { Advert } from 'interfaces/Advert';
import { initialAllAdverts, resetAllAdverts } from 'store/actionType';

const allAdverts = (payload: [] | Array<Advert>): object => ({
    type: initialAllAdverts,
    payload: payload,
});

const resetAdverts = (): object => ({
    type: resetAdverts,
});

export { allAdverts, resetAdverts };
