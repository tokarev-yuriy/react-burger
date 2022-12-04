import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './app-nav-link.module.css';

function AppNavLink(props) {
    const active = useRouteMatch({path: props.to, exact: props.exact});
    return (
        <Link to={props.to} className={active ? styles.nav_link_active : styles.nav_link}>
            {props.children}
            <span className={styles.nav_link_text}>{props.text}</span>
        </Link>
    );
}

export { AppNavLink };
