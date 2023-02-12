import React from 'react';
import styles from './header.module.scss';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const Header = (): JSX.Element => {
    const classes = classNames([[styles.header]]);

    const location = useLocation();

    console.log('location: ', location.pathname);

    return <header className={classes}>header</header>;
};

export default Header;
