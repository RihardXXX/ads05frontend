import React, { useState, useEffect, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_IN_USER, RESET_PASSWORD_USER } from 'apollo/mutation';
import styles from './signin.module.scss';
import classNames from 'classnames';
import Input from 'components/common/input';
import Button from 'components/common/button';
import LoadedPage from 'components/LoadedPage/LoadedPage';

const errorsObject = {
    errorEmail: '',
    errorPassword: '',
};

const Signin = () => {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    useEffect(() => {
        document.title = 'Авторизация пользователя';
    });

    // state
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
    const [signInUser, { loading }] = useMutation(SIGN_IN_USER);
    const [resetPasswordForUser, { loading: loadingPassword }] =
        useMutation(RESET_PASSWORD_USER);

    const submitted = (e: React.FormEvent) => {
        e.preventDefault();
        // reset error
        setErrors(errorsObject);

        signInUser({
            variables: {
                email: email,
                password: password,
            },
            onCompleted: (data) => {
                const token = data.signIn;
                console.log('token: ', token);
                //TODO:  создать кастомный хук по работе с локалсториджем
                //TODO:  изменить на статус авторизован
                //TODO:  сменить роут и перейти на главную страницу
            },
            onError: (error) => {
                console.log('errors: ', error.message);
                const [name, text, textErrorEmail] = error.message.split(':');
                console.log('name: ', name);
                console.log('text: ', text);
                switch (name) {
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

    const resetPassword = (): void => {
        console.log('resetPassword');
        setErrors(errorsObject);
        resetPasswordForUser({
            variables: {
                email: email,
            },
            onCompleted: (data) => {
                const ok = data.requestLinkForPassword;
                if (ok) {
                    console.log('ok: ', ok);
                }
                //TODO:  создать кастомный хук по работе с локалсториджем
                //TODO:  изменить на статус авторизован
                //TODO:  сменить роут и перейти на главную страницу
                //TODO:  ссылка для работы с автоматической авторизацией
                //TODO:  https://www.apollographql.com/docs/react/networking/authentication/#header
            },
            onError: (error) => {
                console.log('errors: ', error.message);
                const [name, text] = error.message.split(':');
                console.log('name: ', name);
                console.log('text: ', text);
                switch (name) {
                    case 'email':
                        setErrors((state) => ({
                            ...state,
                            errorEmail: text.trim(),
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
            {loading || (loadingPassword && <LoadedPage />)}
            <h1 className={styles.title}>Войти</h1>
            <p>пожалуйста введите логин и пароль</p>

            <form onSubmit={submitted}>
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

            <Button
                name="сбросить пароль"
                className={styles.reset}
                type="outline"
                color="black"
                onClick={resetPassword}
            />
        </div>
    );
};

export default Signin;
