import React, { ChangeEvent, Dispatch, FC, ReactElement, SetStateAction, SyntheticEvent, useEffect } from 'react';
import styles from './profile-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { EditableInput } from '../../misc/editable-input/editable-input';
import { getUser } from '../../../api/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile } from '../../../services/actions/auth';
import { useForm } from '../../../hooks/useForm';
import { IAuthStore } from '../../../services/reducers/auth';
import { Action } from 'redux';

interface IProfileFormProps {
    setHelp: Dispatch<SetStateAction<ReactElement | string>>;
}

interface ISelected {
    isRequest: boolean;
    isRequestFailed: boolean;
    requestError: string;
}
  
interface IStore {
    auth: IAuthStore;
}

const ProfileForm: FC<IProfileFormProps> = (props: IProfileFormProps) => {
    const { values, handleChange, setValues } = useForm({
        email: '',
        name: '',
        password: '',
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const {isRequest, isRequestFailed, requestError} = useSelector<IStore, ISelected> (
        (store:IStore)  => {
            return {
                isRequest: store.auth.profileRequest,
                isRequestFailed: store.auth.profileRequestFail,
                requestError: store.auth.profileError
            }
        }
    );

    const handleProfileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setChanged(true);
        return handleChange(event);
    }

    const loadUser = async (): Promise<void> => {
        setLoading(true);
        try {
            const user = await getUser();
            setValues({ ...user, password: '' });
            setChanged(false);
        } catch (e) {
            history.push('/login');
        }
        setLoading(false);
    }

    const saveUser = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        try {
            dispatch(saveProfile(values) as unknown as Action<string>);
        } catch (e) {
            history.push('/login');
        }
        setLoading(false);
    }

    useEffect(() => {
        props.setHelp(() => (
            <p>
                В этом разделе вы можете<br />
                изменить свои персональные данные
            </p>
        ));
        loadUser();
        // eslint-disable-next-line 
    }, []);

    return (
        <div className={styles.form}>
            {(isLoading || isRequest) && (
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
                {isRequestFailed && (
                    <div className={styles.error}>
                        Произошла ошибка {requestError}
                    </div>
                )}
                {isLoading ? (
                    <p className={styles.loading}>
                        Обрабатываю ваш запрос
                    </p>
                ) : changed && (
                    <div className={styles.buttons}>
                        <Button htmlType='reset' type='secondary' onClick={loadUser}>Отмена</Button>
                        <Button htmlType='submit'>Сохранить</Button>
                    </div>
                )}
            </form>
        </div>
    );
}

export { ProfileForm };
