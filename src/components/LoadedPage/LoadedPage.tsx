import React from 'react';
import styles from './loadedPage.module.scss';
import classNames from 'classnames';

const LoadedPage = (): JSX.Element => {
    const classes = classNames([[styles.overlay], { [styles._show]: true }]);

    return (
        <div className={classes}>
            <div className={styles.spinner}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
                <div className={styles.bar4}></div>
                <div className={styles.bar5}></div>
                <div className={styles.bar6}></div>
                <div className={styles.bar7}></div>
                <div className={styles.bar8}></div>
                <div className={styles.bar9}></div>
                <div className={styles.bar10}></div>
                <div className={styles.bar11}></div>
                <div className={styles.bar12}></div>
            </div>
        </div>
    );
};

export default LoadedPage;
