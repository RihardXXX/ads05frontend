import React from 'react';
import styles from './detailAdvert.module.scss';
import classNames from 'classnames';
import { ReactComponent as Watch } from 'assets/icons/watch.svg';
import Button from 'components/common/button';

const DetailAdvert = () => {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    return (
        <div className={styles.detailPage}>
            <div className={styles.wrapperHeader}>
                <div className={styles.watch}>
                    <Watch />
                    <span>0</span>
                    <span>watches</span>
                </div>
                <div className={styles.created}>5 марта 2023 г., 14:06</div>
            </div>
            <h3 className={styles.name}>Welcome to the app</h3>
            <p className={styles.content}>
                Lorem ipsum dolor sit amet consectetur. Velit et sodales sociis
                sapien quis egestas. Mauris commodo mi faucibus sit eget in non.
                Eu enim molestie hendrerit quisque malesuada nisl sit.
            </p>
            <div className={styles.tags}>
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
            </div>
        </div>
    );
};

export default DetailAdvert;
