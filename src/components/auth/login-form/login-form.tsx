import React, { FormEventHandler, ReactElement } from 'react';
import styles from './login-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../services/actions/auth';
import { useForm } from '../../../hooks/useForm';
import { Action } from 'redux';
import { useAppDispatch, useAppSelector } from '../../../services/types/hooks';

function LoginForm(): ReactElement {

    const [isLocked, setIsLocked] = useState<boolean>(true);
    const {isRequest, isRequestFailed} = useAppSelector((store) => {
        return {
            isRequest: store.auth.loginRequest,
            isRequestFailed: store.auth.loginRequestFail
        }
    });
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const switchPassword = (): void => {
        setIsLocked(!isLocked);
    };

    const loginUser: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        dispatch(login(values.email, values.password) as unknown as Action<string>);
    }

    return (
        <div className={styles.form}>
            <form onSubmit={loginUser}>
                <h2 className={styles.title}>Вход</h2>
                <Input
                    type={'email'}
                    value={values.email}
                    name={'email'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    extraClass={styles.input}
                />
                <Input
                    type={isLocked ? 'password' : 'text'}
                    value={values.password}
                    name={'password'}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={isLocked ? 'ShowIcon' : 'HideIcon'}
                    onIconClick={switchPassword}
                    extraClass={styles.input}
                />
                {isRequest && (
                    <div className={styles.loading}>
                        Отправляем запрос...
                    </div>
                )}
                {isRequestFailed && (
                    <div className={styles.error}>
                        Неверный email или пароль
                    </div>
                )}
                {!isRequest && (
                    <Button htmlType='submit'>Войти</Button>
                )}
            </form>
            <div className={styles.help}>
                <p>
                    Вы - новый пользователь?&nbsp;
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p>
                    Забыли пароль?&nbsp;
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
}

export { LoginForm };
