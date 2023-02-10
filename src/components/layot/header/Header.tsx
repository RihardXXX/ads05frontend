import React from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';

const Header = (): JSX.Element => {
    const classes = classNames([[styles.header]]);

    return <header className={classes}>header</header>;
};

export default Header;
