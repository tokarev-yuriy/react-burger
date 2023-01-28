import React, { ReactElement } from 'react';
import styles from './personal-menu.module.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../services/actions/auth';
import { Action } from 'redux';
import { useAppDispatch } from '../../../services/types/hooks';



function PersonalMenu(): ReactElement {

    const dispatch = useAppDispatch();

    const logoutUser = (): void => {
        dispatch(logout() as unknown as Action<string>)
    }

    return (
        <div>
            <div className={styles.menu}>
                <NavLink to="/profile" exact activeClassName={styles.activeItem} className={styles.item}>Профиль</NavLink>
                <NavLink to="/profile/orders" activeClassName={styles.activeItem} className={styles.item}>История заказов</NavLink>
                <button type="button" className={styles.item} onClick={logoutUser}>Выход</button>
            </div>
        </div>
    );
}

export { PersonalMenu };
