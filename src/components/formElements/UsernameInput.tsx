import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: string;
    className?: string;
    dispatch: Dispatch<FormAction>;
}

export const UsernameInput = ({ value, className, dispatch }: Props) => {
    return (
        <input type="text" className={`form__inp${className ? ' ' + className : ''}`} value={value} onChange={(e) => dispatch({ type: 'USERNAME_CHANGE', payload: e.target.value })} placeholder="Nick" />
    );
};