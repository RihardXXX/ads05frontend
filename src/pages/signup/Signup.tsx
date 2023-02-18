import React, { useState, useEffect, useMemo } from 'react';
import styles from './signup.module.scss';
import classNames from 'classnames';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { SIGN_UP_USER } from 'apollo/mutation';
import { useMutation } from '@apollo/client';

const errorsObject = {
    errorUsername: '',
    errorEmail: '',
    errorPassword: '',
};

const Signup = () => {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    useEffect(() => {
        document.title = 'Регистрация пользователя';
    });

    // state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(errorsObject);

    // error status
    const isError = useMemo<boolean>(() => {
        return Object.values(errors).some((errorValue) => errorValue);
    }, [errors]);

    // error text
    const errorMessage = useMemo<string | ''>(() => {
        return Object.values(errors).filter((errorValue) => errorValue)[0];
    }, [errors]);

    // apollo
    const [signUpUser] = useMutation(SIGN_UP_USER);

    const submitted = (e: React.FormEvent) => {
        e.preventDefault();
        // reset error
        setErrors(errorsObject);

        signUpUser({
            variables: {
                username: username,
                email: email,
                password: password,
            },
            onCompleted: (data) => {
                console.log('data: ', data);
            },
            onError: (error) => {
                console.log('errors: ', error.message);
                const [name, text, textErrorEmail] = error.message.split(':');
                console.log('name: ', name);
                console.log('text: ', text);
                switch (name) {
                    case 'username':
                        setErrors((state) => ({
                            ...state,
                            errorUsername: text.trim(),
                        }));
                        break;
                    case 'email':
                        setErrors((state) => ({
                            ...state,
                            errorEmail: text.trim(),
                        }));
                        break;
                    case 'password':
                        setErrors((state) => ({
                            ...state,
                            errorPassword: text.trim(),
                        }));
                        break;
                    case 'ValidationError':
                        setErrors((state) => ({
                            ...state,
                            errorEmail: textErrorEmail.trim(),
                        }));
                        break;
                    default:
                        setErrors((state) => ({ ...state }));
                }
            },
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Войти</h1>
            <p>пожалуйста введите логин и пароль</p>

            <form onSubmit={submitted}>
                <Input
                    className={styles.name}
                    type="text"
                    label="имя"
                    id="name"
                    value={username}
                    isError={errors.errorUsername}
                    onChange={(e) => setUsername(e.target.value.trim())}
                />
                <Input
                    className={styles.email}
                    type="email"
                    label="почта"
                    id="email"
                    value={email}
                    isError={errors.errorEmail}
                    onChange={(e) => setEmail(e.target.value.trim())}
                />
                <Input
                    className={styles.password}
                    type="password"
                    label="пароль"
                    id="password"
                    value={password}
                    isError={errors.errorPassword}
                    onChange={(e) => setPassword(e.target.value.trim())}
                />

                {isError && (
                    <div className={styles.errorSection}>{errorMessage}</div>
                )}

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

export default Signup;
