import React, { FormEvent, FormEventHandler, ReactElement } from "react";
import styles from "./reset-form.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { resetPassword } from "../../../api/password";
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import * as H from "history";

interface StateWithReferer extends H.Location {
    referer?: {
        pathname?: string;
    }
};

function ResetForm(): ReactElement {
    const { values, handleChange, setValues } = useForm({
        code: "",
        password: "",
    });
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const location = useLocation<StateWithReferer>();
    const params = useParams<{token?: string}>();

    useEffect(() => {
        if (params && params["token"]) {
            setValues({ ...values, code: params["token"] });
        } else {
            const { referer } = location.state || { referer: {} };
            const { pathname } = referer || {pathname: null};
            if (!pathname || pathname !== "/forgot-password") {
                history.replace("/forgot-password");
            }
        }
    }, [params, location, history]);

    const changePassword: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            await resetPassword(values.password, values.code);
            history.push("/login", { referer: { pathname: "/reset-password" } });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Неизвестная ошибка');
            }
        }
        setLoading(false);
    };

    const switchPassword = (): void => {
        setIsLocked(!isLocked);
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Восстановление пароля</h2>
            <form onSubmit={changePassword}>
                <Input
                    type={isLocked ? "password" : "text"}
                    value={values.password}
                    name={"password"}
                    placeholder={"Введите новый пароль"}
                    onChange={handleChange}
                    icon={isLocked ? "ShowIcon" : "HideIcon"}
                    onIconClick={(e) => switchPassword()}
                    extraClass={styles.input}
                />
                <Input
                    type={"text"}
                    value={values.code}
                    name={"code"}
                    placeholder={"Введите код из письма"}
                    onChange={handleChange}
                    extraClass={styles.input}
                />
                {error && <p className={styles.error}>{error}</p>}
                {isLoading ? (
                    <p className={styles.loading}>Обрабатываю ваш запрос</p>
                ) : (
                    <Button htmlType="submit">Сохранить</Button>
                )}
            </form>
            <div className={styles.help}>
                <p>
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export { ResetForm };
