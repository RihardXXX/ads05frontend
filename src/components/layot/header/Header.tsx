import React, { useContext } from 'react';
import styles from './header.module.scss';
// import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import GlobalContext from 'store/context';

// interface TitleList {
//     [key: string]: string;
// }

// // name header form path
// const titleList: TitleList = {
//     '/': 'Все',
//     '/favorites': 'Избранные',
//     '/my': 'Мои',
//     '/create': 'Создать',
//     '/detail-advert/:id': 'Подробнее',
// };

const Header = (): JSX.Element => {
    const classes = classNames([[styles.header]]);

    // const location = useLocation();

    // const title = titleList[location.pathname];

    const {
        header: { headerName },
    } = useContext(GlobalContext);

    return (
        <header className={classes}>
            <div className={styles.pathName}>{headerName}</div>
            <div>menu</div>
        </header>
    );
};

export default Header;
