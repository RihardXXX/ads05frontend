import React from 'react';
import styles from './signin.module.scss';
import classNames from 'classnames';
import Input from 'components/common/input';

const Sigin = () => {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const submit = () => {
        console.log('send');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Войти</h1>
            <p>пожалуйста введите логин и пароль</p>

            <form onSubmit={submit}>
                <Input
                    className={styles.name}
                    type="text"
                    label="имя"
                    id="name"
                />
                <Input
                    className={styles.email}
                    type="email"
                    label="почта"
                    id="email"
                />
                <Input
                    className={styles.password}
                    type="password"
                    label="пароль"
                    id="password"
                />
            </form>
        </div>
    );
};

export default Sigin;
