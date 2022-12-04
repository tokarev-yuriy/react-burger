import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({role, children, ...rest}) {

    const isLoggedIn = useSelector(store => store.auth.user && store.auth.user.email);

    if (role === 'unauthorized' && isLoggedIn) {
        return (
            <Redirect to={'/'} />
        );
    }

    if (role === 'authorized' && !isLoggedIn) {
        return (
            <Redirect to={'/login'} />
        );
    }

    return (
        <Route {...rest}>
           { children }
        </Route>
    )
}

export { ProtectedRoute };