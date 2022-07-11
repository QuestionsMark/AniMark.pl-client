import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    title?: string;
    className?: string;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const EmailFormPart = ({ className, title, value, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Email'}</h3>
            <input type="email" className="form__inp form__email-inp" placeholder="Email" value={value} onChange={(e) => dispatch({ type: 'EMAIL_CHANGE', payload: e.target.value })} maxLength={400} />
        </div>
    );
};