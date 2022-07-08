import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    title?: string;
    className?: string;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const ConfirmPasswordFormPart = ({ className, value, title, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Potwierdź zmiany obecnym hasłem'}</h3>
            <input type="password" className="form__inp form__confirm-password-inp" placeholder="Obecne hasło" value={value} onChange={(e) => dispatch({ type: 'CONFIRM_PASSWORD_CHANGE', payload: e.target.value })} maxLength={150} />
        </div>
    );
};