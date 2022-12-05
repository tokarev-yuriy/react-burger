import React from 'react';
import styles from './register-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../services/actions/auth';
import { useForm } from '../../../hooks/useForm';



function RegisterForm(props) {

    const {values, handleChange, setValues} = useForm({
        email: '',
        password: '',
        name: '',
    });
    const [isLocked, setIsLocked] = useState(true);
    const [isRequest, isRequestFailed] = useSelector(store => [store.auth.registerRequest, store.auth.registerRequestFail] );
    const dispatch = useDispatch();

    const switchPassword = () => {
        setIsLocked(!isLocked);
    };

    const registerUser = (e) => {
        e.preventDefault();
        dispatch(register(values));
    };

    const getError = (field) => {
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
            { isRequest && (
                <div className={styles.loading}>
                    Отправляем запрос...
                </div>
            )}
            { isRequestFailed && (
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
