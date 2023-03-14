import React, { useContext, useState } from 'react';
import styles from './header.module.scss';
// import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import GlobalContext from 'store/context';
import Button from 'components/common/button';
import { stringToDate } from 'utils';
import { setLogout } from 'store/actions';

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

    const overlayClasses: string = classNames([
        [styles.overlay],
        { [styles._show]: show },
    ]);

    const {
        header: { headerName },
        authorization: {
            stateAuthorization: { user },
            dispatchAuth,
        },
    } = useContext(GlobalContext);

    const exitProfile = (): void => {
        // console.log('exit');
        dispatchAuth(setLogout('logout'));
    };

    return (
        <header className={classes}>
            <div
                className={overlayClasses}
                onClick={() => (show ? showMenu() : undefined)}
            ></div>
            <div className={styles.pathName}>{headerName}</div>
            <div className={menuClasses} onClick={showMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <section className={menuPageClasses}>
                <h1>Мой профиль</h1>
                <div className={styles.hr} />
                <div className={styles.manager}>
                    <ul>
                        <li>
                            <img src={user?.avatar} alt={user?.username} />
                        </li>
                        <li>
                            имя: <span>{user?.username}</span>
                        </li>
                        <li>
                            почта: <span>{user?.email}</span>
                        </li>
                        <li>
                            анкета:{' '}
                            {user?.createdAt && stringToDate(user?.createdAt)}
                        </li>
                    </ul>
                    <Button
                        name="выйти"
                        type="outline"
                        className={styles.button}
                        onClick={exitProfile}
                    />
                </div>
            </section>
        </header>
    );
};

export default Header;
