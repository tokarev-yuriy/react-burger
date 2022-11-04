import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppNavLink from '../app-nav-link/app-nav-link';
class AppHeader extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.header_block} >
                    <nav>
                        <AppNavLink text='Конструктор' active={true}>
                            <BurgerIcon />
                        </AppNavLink>
                        <AppNavLink text='Лента заказов'>
                            <ListIcon />
                        </AppNavLink>
                    </nav>
                    <AppNavLink text='Личный кабинет'>
                            <ProfileIcon />
                    </AppNavLink>
                </div>
                <div className={styles.header_logo} >
                    <Logo />
                </div>
            </header>
        );
    }
}

export default AppHeader;
