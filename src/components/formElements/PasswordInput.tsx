import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const PasswordInput = ({ value, dispatch }: Props) => {
    return (
        <input type="password" className="form__inp" value={value} onChange={(e) => dispatch({ type: 'PASSWORD_CHANGE', payload: e.target.value })} placeholder="Hasło" />
    );
};