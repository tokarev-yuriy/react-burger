import React from 'react';
import styles from './reset-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword } from '../../../api/password';



function ResetForm(props) {

    
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const changePassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await resetPassword(password, code)
            history.push('/login', {referer: '/reset-password'});
        } catch(err) {
            setError(err.message);
        }
        setLoading(false);
    }

    const switchPassword = () => {
        setIsLocked(!isLocked);
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Восстановление пароля</h2>
            <form onSubmit={changePassword}>
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
            {error && (
                <p className={styles.error}>
                    {error}
                </p>
            )}
            {isLoading ? (
                <p className={styles.loading}>
                    Обрабатываю ваш запрос
                </p>
            ):(
                <Button htmlType='submit'>Сохранить</Button>
            )}
            </form>
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
