import React, { useContext } from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Favorite } from 'assets/icons/favorite.svg';
import { ReactComponent as My } from 'assets/icons/my.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import GlobalContext from 'store/context';

const Footer = (): JSX.Element => {
    const {
        authorization: {
            stateAuthorization: { user },
        },
    } = useContext(GlobalContext);

    const footerClasses = classNames([[styles.footer]]);
    const createClasses = classNames([
        [styles.item],
        { [styles.disabled]: !user?.confirmed },
    ]);

    return (
        <footer className={footerClasses}>
            <nav>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? styles._active : undefined
                            }
                        >
                            <Home />
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            to="favorites"
                            className={({ isActive }) =>
                                isActive ? styles._active : undefined
                            }
                        >
                            <Favorite />
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            to="my"
                            className={({ isActive }) =>
                                isActive ? styles._active : undefined
                            }
                        >
                            <My />
                        </NavLink>
                    </li>
                    <li className={createClasses}>
                        <NavLink
                            to="create"
                            className={({ isActive }) =>
                                isActive ? styles._active : undefined
                            }
                        >
                            <Add />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
