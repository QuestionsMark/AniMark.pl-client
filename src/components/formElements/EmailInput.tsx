import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const EmailInput = ({ value, dispatch }: Props) => {
    return (
        <input type="email" className="form__inp" value={value} onChange={(e) => dispatch({ type: 'EMAIL_CHANGE', payload: e.target.value })} placeholder="Email" />
    );
};