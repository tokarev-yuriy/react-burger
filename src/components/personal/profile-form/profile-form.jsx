import React, { useEffect } from 'react';
import styles from './profile-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { EditableInput } from '../../misc/editable-input/editable-input';
import { getUser } from '../../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { TokenError } from '../../../api/helpers';
import { useHistory } from 'react-router-dom';


function ProfileForm(props) {

    const initialForm = {
        email: '',
        name: '',
        password: '',
    };
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [changed, setChanged] = useState(false);
    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const setField = (name, val) => {
        const f = {...form};
        f[name] = val;
        setChanged(true);
        setForm(f);
    };

    const loadUser = async () => {
        setLoading(true);
        try {
            const user = await getUser(token['access'], token['refresh']);
            setForm({...user, password: ''});
            setChanged(false);
        } catch (e) {
            history.replace('/');
        }
        setLoading(false);
    }

    useEffect(() => {
        props.setHelp(() => (
            <p>
            В этом разделе вы можете<br/>
            изменить свои персональные данные
            </p>
        ));
        loadUser();
        // eslint-disable-next-line 
    }, []);

    return (
        <div className={styles.form}>
            { loading && (
                <div className={styles.loading} />
            )}
            <EditableInput 
                type={'text'} 
                value={form.name}
                placeholder={'Имя'} 
                onChange={e => setField('name', e.target.value)}
                extraClass={styles.input}
            />
            <EditableInput 
                type={'email'} 
                value={form.email}
                placeholder={'E-mail'} 
                onChange={e => setField('email', e.target.value)}
                extraClass={styles.input}
            />
            <EditableInput 
                type={'password'} 
                value={form.password}
                placeholder={'Пароль'} 
                onChange={e => setField('password', e.target.value)}
                extraClass={styles.input}
            />
            {changed && (
                <div className={styles.buttons}>
                    <Button htmlType='reset' type='secondary' onClick={loadUser}>Отмена</Button>
                    <Button htmlType='submit'>Сохранить</Button>
                </div>
            )}
            
        </div>
    );
}

export { ProfileForm };
