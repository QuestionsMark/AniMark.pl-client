import { Dispatch, SyntheticEvent, useReducer } from "react";
import { usePopup } from "../../contexts/popupContext";
import { useUser } from "../../contexts/userContext";
import { useValidation } from "../../hooks/useValidation";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { AuthorizationAPI, RegistrationFormEntity } from "../../types";
import { fetchTool } from "../../utils/fetchHelper";
import { defaultRegistrationForm } from "../../validation/registraction";
import { SubmitButton } from "../common/SubmitButton";
import { EmailInput } from "./EmailInput";
import { LoginInput } from "./LoginInput";
import { PasswordInput } from "./PasswordInput";
import { RulesAcceptation } from "./RulesAcceptation";
import { UsernameInput } from "./UsernameInput";

export const RegistrationForm = () => {

    const { setToken } = useUser();
    const { loginPopup, setLoginPopup } = usePopup();
    const { message, status } = loginPopup;

    const [form, dispatch] = useReducer(formReducer, defaultRegistrationForm) as [RegistrationFormEntity, Dispatch<FormAction>];
    const { errors } = useValidation(form, 'REGISTRATION');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (errors.length !== 0) return;
        const { message, status, results } = await fetchTool('users', 'POST', form);
        if (!status) return setLoginPopup({ message: message, open: true, status: status });
        const { token } = results as AuthorizationAPI;
        setLoginPopup({ message: message, open: true, status: status });
        setTimeout(() => {
            setLoginPopup({ message: '', open: false, status: false });
            setToken(token);
        }, 2000);
    };

    return (
        <form className="login-popup__form form" onSubmit={handleSubmit}>
            <LoginInput dispatch={dispatch} value={form.login} />
            <PasswordInput dispatch={dispatch} value={form.password} />
            <EmailInput dispatch={dispatch} value={form.email} />
            <UsernameInput dispatch={dispatch} value={form.username} />
            <RulesAcceptation dispatch={dispatch} value={form.rulesAcceptation} />
            <SubmitButton errors={errors.length} value="Zarejestruj" />
            {message && <p className={`login-popup__response${!status ? ' red' : ' green'}`}>{message}</p>}
        </form>
    );
};