import React, { FormEventHandler, ReactElement } from 'react';
import styles from './register-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../services/actions/auth';
import { useForm } from '../../../hooks/useForm';
import { IAuthStore } from '../../../services/reducers/auth';
import { Action } from 'redux';

interface ISelected {
    isRequest: boolean;
    isRequestFailed: boolean;
}
  
interface IStore {
    auth: IAuthStore;
}

function RegisterForm(): ReactElement {

    const { values, handleChange } = useForm({
        email: '',
        password: '',
        name: '',
    });
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const {isRequest, isRequestFailed} = useSelector<IStore, ISelected>((store: IStore) => {
        return {
            isRequest: store.auth.registerRequest,
            isRequestFailed: store.auth.registerRequestFail
        }
    });
    const dispatch = useDispatch();

    const switchPassword = (): void => {
        setIsLocked(!isLocked);
    };

    const registerUser: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        dispatch(register(values) as unknown as Action<string>);
    };

    const getError = (field: string): string => {
        if (isRequestFailed && !values[field]) {
            return 'Поле не может быть пустым';
        }
        return '';
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Регистрация</h2>
            <form onSubmit={registerUser}>
                <Input
                    type={'text'}
                    value={values.name}
                    name={'name'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    extraClass={styles.input}
                    error={getError('name') ? true : false}
                    errorText={getError('name')}
                />
                <Input
                    type={'email'}
                    value={values.email}
                    name={'email'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    extraClass={styles.input}
                    error={getError('email') ? true : false}
                    errorText={getError('email')}
                />
                <Input
                    type={isLocked ? 'password' : 'text'}
                    value={values.password}
                    name={'password'}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={isLocked ? 'ShowIcon' : 'HideIcon'}
                    onIconClick={e => switchPassword()}
                    extraClass={styles.input}
                    error={getError('password') ? true : false}
                    errorText={getError('password')}
                />
                {isRequest && (
                    <div className={styles.loading}>
                        Отправляем запрос...
                    </div>
                )}
                {isRequestFailed && (
                    <div className={styles.error}>
                        Произошла ошибка
                    </div>
                )}
                {!isRequest && (
                    <Button htmlType='submit'>Зарегистрироваться</Button>
                )}
            </form>
            <div className={styles.help}>
                <p>
                    Уже зарегистрированы?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export { RegisterForm };
