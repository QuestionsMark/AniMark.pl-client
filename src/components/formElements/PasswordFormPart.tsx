import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    title?: string;
    className?: string;
    password: string;
    passwordAgain: string;
    dispatch: Dispatch<FormAction>;
}

export const PasswordFormPart = ({ className, password, passwordAgain, title, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Hasło'}</h3>
            <div className="form__password-container">
                <input type="password" className="form__inp form__password-inp" placeholder="Hasło" value={password} onChange={(e) => dispatch({ type: 'PASSWORD_CHANGE', payload: e.target.value })} maxLength={150} />
                <input type="password" className="form__inp form__password-inp" placeholder="Powtórz Hasło" value={passwordAgain} onChange={(e) => dispatch({ type: 'PASSWORD_AGAIN_CHANGE', payload: e.target.value })} maxLength={150} />
            </div>
        </div>
    );
};