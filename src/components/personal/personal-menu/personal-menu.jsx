import React from 'react';
import styles from './personal-menu.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/actions/auth';



function PersonalMenu() {

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = () => {
        dispatch(logout(token.refresh, () => {
            history.replace('/');
        }))
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
