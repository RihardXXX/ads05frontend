import React from 'react';
import styles from './adverts.module.scss';
import classNames from 'classnames';
import CardAdvertPreview from 'components/common/cardAdvertPreview';

function Adverts() {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    return (
        <>
            <CardAdvertPreview />
            <CardAdvertPreview />
            <CardAdvertPreview />
        </>
    );
}

export default Adverts;
