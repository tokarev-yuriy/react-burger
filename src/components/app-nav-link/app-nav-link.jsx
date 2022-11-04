import React from 'react';
import styles from './app-nav-link.module.css';

class AppNavLink extends React.Component {
    render() {
        return (
            <a className={this.props.active ? styles.nav_link_active : styles.nav_link}>
                {this.props.children}
                <span className="pl-2 text text_type_main-default">{this.props.text}</span>
            </a>
        );
    }
}

export default AppNavLink;
