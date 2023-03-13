import React, { useContext, useState } from 'react';
import styles from './header.module.scss';
// import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import GlobalContext from 'store/context';

// interface TitleList {
//     [key: string]: string;
// }

// // // name header form path
// const titleList: TitleList = {
//     '/': 'Все',
//     '/favorites': 'Избранные',
//     '/my': 'Мои',
//     '/create': 'Создать',
//     '/detail-advert/:id': 'Подробнее',
// };

const Header = (): JSX.Element => {
    const classes = classNames([[styles.header]]);

    const [show, setShow] = useState<boolean>(false);

    const showMenu = (): void => {
        setShow((show: boolean): boolean => !show);
    };

    // const location = useLocation();

    // const title = titleList[location.pathname];

    const menuClasses: string = classNames([
        [styles.menu],
        { [styles.show]: show },
    ]);
    const menuPageClasses: string = classNames([
        [styles.menuPage],
        { [styles.showMenu]: show },
    ]);

    const {
        header: { headerName },
    } = useContext(GlobalContext);

    return (
        <header className={classes}>
            <div className={styles.pathName}>{headerName}</div>
            <div className={menuClasses} onClick={showMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <section className={menuPageClasses}>
                <h1>Мой профиль</h1>
            </section>
        </header>
    );
};

export default Header;
