import React from 'react';
import styles from './adverts.module.scss';
import classNames from 'classnames';

function Adverts() {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    return (
        <div>
            <h2 className={classes}>Adverts</h2>
        </div>
    );
}

export default Adverts;
