import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { tokenStorage } from "../../../services/token-storage";
import PropTypes from 'prop-types';

function ProtectedRoute({ role, children, ...rest }) {

    const isLoggedIn = useSelector(store => store.auth.user && store.auth.user.email && tokenStorage.getInstance().getToken());
    const location = useLocation();

    if (role === 'unauthorized' && isLoggedIn) {
        const { referer } = location.state || { referer: { pathname: "/" } };
        return (
            <Route {...rest}>
                <Redirect to={referer} />
            </Route>
        );
    }

    if (role === 'authorized' && !isLoggedIn) {
        return (
            <Route {...rest}>
                <Redirect to={{ pathname: '/login', state: { referer: location } }} />
            </Route>
        );
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}

ProtectedRoute.propTypes = {
    role: PropTypes.string.isRequired,
};

export { ProtectedRoute };