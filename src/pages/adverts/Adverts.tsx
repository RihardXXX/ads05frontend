import React from 'react';
import styles from './adverts.module.scss';
import classNames from 'classnames';
import CardAdvertList from 'components/common/cardAdvertList/cardAdvertList';

const data = [1, 2, 3, 4, 5, 6, 7];

function Adverts() {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    return (
        <>
            <CardAdvertList adverts={data} />
        </>
    );
}

export default Adverts;
