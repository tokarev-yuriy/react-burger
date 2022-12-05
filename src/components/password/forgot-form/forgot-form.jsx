import React from 'react';
import styles from './forgot-form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { forgotPassword } from '../../../api/password';
import { useForm } from '../../../hooks/useForm';



function ForgotForm(props) {

    const {values, handleChange, setValues} = useForm({email: ''});
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const sendMail = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await forgotPassword(values.email);
            history.push('/reset-password', {referer: '/forgot-password'});
        } catch(err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Восстановление пароля</h2>
            <form onSubmit={sendMail}>
            <Input 
                type={'email'} 
                value={values.email}
                name={'email'}
                placeholder={'Укажите e-mail'} 
                onChange={handleChange}
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
                <Button htmlType='submit'>Восстановить</Button>
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

export { ForgotForm };
