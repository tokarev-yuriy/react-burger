import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './app-nav-link.module.css';
import PropTypes from 'prop-types';

function AppNavLink(props) {
    const active = useRouteMatch({ path: props.to, exact: props.exact });
    return (
        <Link to={props.to} className={active ? styles.nav_link_active : styles.nav_link}>
            {props.children}
            <span className={styles.nav_link_text}>{props.text}</span>
        </Link>
    );
}

AppNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    exact: PropTypes.bool,
};

export { AppNavLink };
