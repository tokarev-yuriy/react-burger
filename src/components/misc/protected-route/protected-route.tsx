import React, { FC } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { tokenStorage } from "../../../services/token-storage";
import * as H from "history";
import { useAppSelector } from "../../../services/hooks";

interface StateWithReferer extends H.Location {
    referer?: {
        pathname?: string;
    }
};

interface IProtectedRouteProps extends RouteProps {
    role: "unauthorized" | "authorized";
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ role, children, ...rest }: IProtectedRouteProps) => {
    const isLoggedIn = useAppSelector((store): boolean => {
        return store.auth.user && store.auth.user.email && tokenStorage.getInstance().getToken() ? true : false;
    });
    const location = useLocation<StateWithReferer>();

    if (role === 'unauthorized' && isLoggedIn) {
        const { referer } = location.state || { referer: { pathname: "/" } };
        return (
            <Route {...rest}>
                <Redirect to={referer as H.Location} />
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

export { ProtectedRoute };