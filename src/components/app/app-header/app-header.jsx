import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppNavLink } from '../app-nav-link/app-nav-link';

function AppHeader(props) {
    return (
        <header className={styles.header}>
            <div className={styles.header_block} >
                <nav>
                    <AppNavLink text='Конструктор' to={'/'} exact>
                        <BurgerIcon />
                    </AppNavLink>
                    <AppNavLink text='Лента заказов' to={'/orders'} exact>
                        <ListIcon />
                    </AppNavLink>
                </nav>
                <AppNavLink text='Личный кабинет' to={'/profile'}>
                    <ProfileIcon />
                </AppNavLink>
            </div>
            <a href="/" className={styles.header_logo} >
                <Logo />
            </a>
        </header>
    );
}

export { AppHeader };
