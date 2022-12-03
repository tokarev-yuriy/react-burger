import React from 'react';
import styles from './register-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function RegisterForm(props) {

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(true);

    const switchPassword = () => {
        setIsLocked(!isLocked);
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Регистрация</h2>
            <Input 
                type={'text'} 
                value={name}
                placeholder={'Имя'} 
                onChange={e => setName(e.target.value)}
                extraClass={styles.input}
            />
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
            <Button htmlType='submit'>Зарегистрироваться</Button>
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
