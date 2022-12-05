import React, { useEffect } from 'react';
import styles from './profile-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { EditableInput } from '../../misc/editable-input/editable-input';
import { getUser } from '../../../api/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile } from '../../../services/actions/auth';
import PropTypes from 'prop-types';
import { useForm } from '../../../hooks/useForm';


function ProfileForm(props) {

    const {values, handleChange, setValues} = useForm({
        email: '',
        name: '',
        password: '',
    });
    const [isLoading, setLoading] = useState(false);
    const [changed, setChanged] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [isRequest, isRequestFailed, requestError] = useSelector(store => [store.auth.profileRequest, store.auth.profileRequestFail, store.auth.profileError] );

    const handleProfileChange = (e) => {
        setChanged(true);
        return handleChange(e);
    }

    const loadUser = async () => {
        setLoading(true);
        try {
            const user = await getUser();
            setValues({...user, password: ''});
            setChanged(false);
        } catch (e) {
            history.push('/login');
        }
        setLoading(false);
    }

    const saveUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            dispatch(saveProfile(values));
        } catch (e) {
            history.push('/login');
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
            { ( isLoading || isRequest ) && (
                <div className={styles.loadingBlock} />
            )}
            <form onSubmit={saveUser}>
            <EditableInput 
                type={'text'} 
                value={values.name}
                name={'name'}
                placeholder={'Имя'} 
                onChange={handleProfileChange}
                extraClass={styles.input}
            />
            <EditableInput 
                type={'email'} 
                value={values.email}
                name={'email'}
                placeholder={'E-mail'} 
                onChange={handleProfileChange}
                extraClass={styles.input}
            />
            <EditableInput 
                type={'password'} 
                value={values.password}
                name={'password'}
                placeholder={'Пароль'} 
                onChange={handleProfileChange}
                extraClass={styles.input}
            />
            { isRequestFailed && (
                <div className={styles.error}>
                    Произошла ошибка {requestError}
                </div>
            )}
            {isLoading ? (
                <p className={styles.loading}>
                    Обрабатываю ваш запрос
                </p>
            ): changed && (
                <div className={styles.buttons}>
                    <Button htmlType='reset' type='secondary' onClick={loadUser}>Отмена</Button>
                    <Button htmlType='submit'>Сохранить</Button>
                </div>
            )}
            </form>
        </div>
    );
}

ProfileForm.propTypes = {
    setHelp: PropTypes.func,
};

export { ProfileForm };
