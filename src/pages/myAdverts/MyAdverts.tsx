import React, { useLayoutEffect, useContext } from 'react';
import GlobalContext from 'store/context';
// import styles from './adverts.module.scss';
// import classNames from 'classnames';

const MyAdverts = () => {
    // const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    useLayoutEffect(() => setHeader('Мои'), []);

    return (
        <div>
            {/* <h2 className={classes}>Adverts</h2> */}
            <h3>My Adverts</h3>
        </div>
    );
};

export default MyAdverts;
