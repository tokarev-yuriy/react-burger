import React from 'react';
import styles from './personal-menu.module.css';
import { NavLink } from 'react-router-dom';



function PersonalMenu() {
    return (
        <div>
            <div className={styles.menu}>
                <NavLink to="/profile" exact activeClassName={styles.activeItem} className={styles.item}>Профиль</NavLink>
                <NavLink to="/profile/orders" activeClassName={styles.activeItem} className={styles.item}>История заказов</NavLink>
                <button type="button" className={styles.item}>Выход</button>
            </div>
        </div>
    );
}

export { PersonalMenu };
