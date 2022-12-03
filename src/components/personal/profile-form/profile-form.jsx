import React, { useEffect } from 'react';
import styles from './profile-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { EditableInput } from '../../misc/editable-input/editable-input';


function ProfileForm(props) {

    const initialForm = {
        login: '',
        name: '',
        password: '',
    };
    const [form, setForm] = useState(initialForm);

    const setField = (name, val) => {
        const f = {...form};
        f[name] = val;
        setForm(f);
    };

    useEffect(() => {
        props.setHelp(() => (
            <p>
            В этом разделе вы можете<br/>
            изменить свои персональные данные
            </p>
        ));
        // eslint-disable-next-line 
    }, []);

    return (
        <div className={styles.form}>
            <EditableInput 
                type={'text'} 
                value={form.name}
                placeholder={'Имя'} 
                onChange={e => setField('name', e.target.value)}
                extraClass={styles.input}
            />
            <EditableInput 
                type={'email'} 
                value={form.login}
                placeholder={'E-mail'} 
                onChange={e => setField('login', e.target.value)}
                extraClass={styles.input}
            />
            <EditableInput 
                type={'password'} 
                value={form.password}
                placeholder={'Пароль'} 
                onChange={e => setField('password', e.target.value)}
                extraClass={styles.input}
            />
            <div className={styles.buttons}>
                <Button htmlType='reset' type='secondary'>Отмена</Button>
                <Button htmlType='submit'>Сохранить</Button>
            </div>
            
        </div>
    );
}

export { ProfileForm };
