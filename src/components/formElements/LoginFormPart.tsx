import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    title?: string;
    className?: string;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const LoginFormPart = ({ className, title, value, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Login'}</h3>
            <input type="text" className="form__inp form__login-inp" placeholder="Login" value={value} onChange={(e) => dispatch({ type: 'LOGIN_CHANGE', payload: e.target.value })} maxLength={150} />
        </div>
    );
};