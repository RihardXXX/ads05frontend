import React, { useLayoutEffect, useContext } from 'react';
import GlobalContext from 'store/context';
// import styles from './adverts.module.scss';
// import classNames from 'classnames';

const FavoriteAdverts = () => {
    // const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    useLayoutEffect(() => setHeader('Избранные'), []);

    return (
        <div>
            {/* <h2 className={classes}>Adverts</h2> */}
            <h3>Favorite Adverts</h3>
        </div>
    );
};

export default FavoriteAdverts;
