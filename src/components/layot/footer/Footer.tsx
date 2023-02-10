import React from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames';

const Footer = (): JSX.Element => {
    const classes = classNames([[styles.footer]]);

    return <footer className={classes}>footer</footer>;
};

export default Footer;
