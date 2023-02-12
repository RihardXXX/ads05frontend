import React from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Favorite } from 'assets/icons/favorite.svg';
import { ReactComponent as My } from 'assets/icons/my.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';

const Footer = (): JSX.Element => {
    const footerClasses = classNames([[styles.footer]]);

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
                    <li className={styles.item}>
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
