import { Dispatch, SyntheticEvent, useReducer } from "react";
import { usePopup } from "../../contexts/popupContext";
import { useUser } from "../../contexts/userContext";
import { useValidation } from "../../hooks/useValidation";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { AuthorizationAPI, LoginFormEntity } from "../../types";
import { fetchTool } from "../../utils/fetchHelper";
import { defaultLoginForm } from "../../validation/login";
import { SubmitButton } from "../common/SubmitButton";
import { LoginInput } from "./LoginInput";
import { PasswordInput } from "./PasswordInput";

export const LoginForm = () => {

    const { setToken } = useUser();
    const { loginPopup, setLoginPopup } = usePopup();
    const { message, status } = loginPopup;

    const [form, dispatch] = useReducer(formReducer, defaultLoginForm) as [LoginFormEntity, Dispatch<FormAction>];
    const { errors } = useValidation(form, 'LOGIN');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (errors.length !== 0) return;
        const { message, status, results } = await fetchTool('login', 'POST', form);
        if (!status) return setLoginPopup({ message: message, open: true, status: status });
        const { token } = results as AuthorizationAPI;
        setLoginPopup({ message: '', open: false, status: false });
        setToken(token);
    };

    return (
        <form className="login-popup__form form" onSubmit={handleSubmit}>
            <LoginInput dispatch={dispatch} value={form.login} />
            <PasswordInput dispatch={dispatch} value={form.password} />
            <SubmitButton errors={errors.length} value="Zaloguj" />
            {message && <p className={`login-popup__response${!status ? ' red' : ''}`}>{message}</p>}
        </form>
    );
};