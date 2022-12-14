import React from 'react';
import styles from './personal-menu.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/actions/auth';



function PersonalMenu() {

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout())
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
