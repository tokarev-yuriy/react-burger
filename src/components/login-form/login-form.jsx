import React from 'react';
import styles from './login-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function LoginForm(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(true);

    const switchPassword = () => {
        setIsLocked(!isLocked);
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Вход</h2>
            <Input 
                type={'email'} 
                value={login}
                placeholder={'E-mail'} 
                onChange={e => setLogin(e.target.value)}
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
            <Button htmlType='submit'>Войти</Button>
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
