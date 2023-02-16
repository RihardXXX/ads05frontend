import React, { useState } from 'react';
import styles from './signin.module.scss';
import classNames from 'classnames';
import Input from 'components/common/input';
import Button from 'components/common/button';

const Sigin = () => {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const [name, setName] = useState('');

    const submitted = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Войти</h1>
            <p>пожалуйста введите логин и пароль</p>
            name: {name}
            <form onSubmit={submitted}>
                <Input
                    className={styles.name}
                    type="text"
                    label="имя"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value.trim)}
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

                <Button
                    name="test"
                    className={styles.button}
                    type="full"
                    color="black"
                />
            </form>
        </div>
    );
};

export default Sigin;
