import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const stringToDate = (createdAt: string): string => {
    // return moment(createdAt).format("MMM Do YY");
    return moment(createdAt).format('LLL');
};
