import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { UsernameInput } from "./UsernameInput";

interface Props {
    title?: string;
    className?: string;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const UsernameFormPart = ({ className, title, value, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Nick'}</h3>
            <UsernameInput dispatch={dispatch} value={value} className="form__username-inp" />
        </div>
    );
};