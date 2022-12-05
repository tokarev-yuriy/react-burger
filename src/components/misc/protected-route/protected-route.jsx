import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { tokenStorage } from "../../../services/token-storage";
import PropTypes from 'prop-types';

function ProtectedRoute({ role, children, ...rest }) {

    const isLoggedIn = useSelector(store => store.auth.user && store.auth.user.email && tokenStorage.getInstance().getToken());
    const location = useLocation();

    if (role === 'unauthorized' && isLoggedIn) {
        const backUrl = location && location['state'] && location.state['referer'] ? location.state.referer : '/';
        return (
            <Redirect to={backUrl} />
        );
    }

    if (role === 'authorized' && !isLoggedIn) {
        return (
            <Redirect to={'/login'} />
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