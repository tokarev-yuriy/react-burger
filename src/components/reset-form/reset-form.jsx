import React from 'react';
import styles from './reset-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function ResetForm(props) {

    
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(true);

    const switchPassword = () => {
        setIsLocked(!isLocked);
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Восстановление пароля</h2>
            <Input 
                type={isLocked ? 'password' : 'text'} 
                value={password}
                placeholder={'Введите новый пароль'} 
                onChange={e => setPassword(e.target.value)}
                icon={isLocked ? 'ShowIcon' : 'HideIcon'}
                onIconClick={e => switchPassword()}
                extraClass={styles.input}
            />
            <Input 
                type={'text'} 
                value={code}
                placeholder={'Введите код из письма'} 
                onChange={e => setCode(e.target.value)}
                extraClass={styles.input}
            />
            <Button>Сохранить</Button>
            <div className={styles.help}>
                <p>
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export { ResetForm };
