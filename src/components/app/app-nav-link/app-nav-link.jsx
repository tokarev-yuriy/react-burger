import React from 'react';
import styles from './app-nav-link.module.css';

function AppNavLink(props) {
    return (
        <a href="/" className={props.active ? styles.nav_link_active : styles.nav_link}>
            {props.children}
            <span className={styles.nav_link_text}>{props.text}</span>
        </a>
    );
}

export { AppNavLink };
