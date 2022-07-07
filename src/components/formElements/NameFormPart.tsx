import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    title?: string;
    className?: string;
    maxLength?: number;
    minLength?: number;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const NameFormPart = ({ className, maxLength, minLength, title, value, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Nazwa'}</h3>
            <input
                type="text"
                className="form__inp form__inp--part"
                placeholder={title ? title : 'Nazwa'}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={(e) => dispatch({ type: 'NAME_CHANGE', payload: e.target.value })}
            />
        </div>
    );
};