import React from 'react';
import styles from './signin.module.scss';
import classNames from 'classnames';

function Sigin() {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    return (
        <div>
            <h2 className={classes}>Sign in</h2>
        </div>
    );
}

export default Sigin;
