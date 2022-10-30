import React from 'react';
import styles from './app-nav-link.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components';

class AppNavLink extends React.Component {
    render() {
        return (
            <a href="javascript: void(0);" className={[styles.nav_link, 'pl-5 pr-5 pt-4 pb-4'].join(' ')}>
                {this.props.children}
                <span className="pl-2 text text_type_main-default">{this.props.text}</span>
            </a>
        );
    }
}

export default AppNavLink;
