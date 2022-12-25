import React, { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { tokenStorage } from "../../../services/token-storage";
import { IAuthStore } from "../../../services/reducers/auth";
import * as H from "history";

interface StateWithReferer extends H.Location {
    referer?: {
        pathname?: string;
    }
};

interface IProtectedRouteProps {
    role: "unauthorized" | "authorized";
    children?: ReactNode;
    [name: string]: any;
}
 
interface IStore {
    auth: IAuthStore;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ role, children, ...rest }: IProtectedRouteProps) => {
    const isLoggedIn = useSelector<IStore, boolean>((store: IStore): boolean => {
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