import React from 'react';
import styles from './login-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';



function LoginForm(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const [isRequest, isRequestFailed] = useSelector(store => [store.auth.loginRequest, store.auth.loginRequestFail] );
    const dispatch = useDispatch();
    const history = useHistory();

    const switchPassword = () => {
        setIsLocked(!isLocked);
    };

    const loginUser = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <div className={styles.form}>
            <form onSubmit={loginUser}>
            <h2 className={styles.title}>Вход</h2>
            <Input 
                type={'email'} 
                value={email}
                placeholder={'E-mail'} 
                onChange={e => setEmail(e.target.value)}
                extraClass={styles.input}
            />
            <Input 
                type={isLocked ? 'password' : 'text'} 
                value={password}
                placeholder={'Пароль'} 
                onChange={e => setPassword(e.target.value)}
                icon={isLocked ? 'ShowIcon' : 'HideIcon'}
                onIconClick={e => switchPassword()}
                extraClass={styles.input}
            />
            { isRequest && (
                <div className={styles.loading}>
                    Отправляем запрос...
                </div>
            )}
            { isRequestFailed && (
                <div className={styles.error}>
                    Неверный email или пароль
                </div>
            )}
            <Button htmlType='submit'>Войти</Button>
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
