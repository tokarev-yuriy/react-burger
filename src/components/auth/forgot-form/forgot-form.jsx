import React from 'react';
import styles from './forgot-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function ForgotForm(props) {

    const [login, setLogin] = useState('');

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Восстановление пароля</h2>
            <Input 
                type={'email'} 
                value={login}
                placeholder={'Укажите e-mail'} 
                onChange={e => setLogin(e.target.value)}
                extraClass={styles.input}
            />
            <Button htmlType='submit'>Восстановить</Button>
            <div className={styles.help}>
                <p>
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export { ForgotForm };
