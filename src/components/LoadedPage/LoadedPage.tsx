import React from 'react';
import styles from './loadedPage.module.scss';
import classNames from 'classnames';

interface Props {
    show: boolean;
}

const LoadedPage = ({ show }: Props): JSX.Element => {
    const classes = classNames([[styles.overlay], { [styles._show]: show }]);

    return <div className={classes}></div>;
};

export default LoadedPage;
