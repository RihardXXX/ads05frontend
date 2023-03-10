import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const stringToDate = (createdAt: string): string => {
    // return moment(createdAt).format("MMM Do YY");
    return moment(createdAt).format('LLL');
};

export const plural = (num: number, postfixes: Array<string>) => {
    if (!num && isNaN(num)) {
        return '';
    }

    const cases = [2, 0, 1, 1, 1, 2];
    return postfixes[
        num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]
    ];
};
