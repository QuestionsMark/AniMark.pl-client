import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    title?: string;
    className?: string;
    textareaClassName?: string;
    minLength?: number;
    maxLength?: number;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const DescriptionFormPart = ({ className, maxLength, minLength, textareaClassName, title, value, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Opis'}</h3>
            <textarea
                className={`form__textarea${textareaClassName ? ' ' + textareaClassName : ''}`}
                placeholder={title ? title : 'Opis'}
                value={value}
                onChange={(e) => dispatch({ type: 'DESCRIPTION_CHANGE', payload: e.target.value })}
            />
            <small className="form__small">
                Opis powinien zawierać od {minLength ? minLength : 0} do {maxLength ? maxLength : 10000} znaków. ( <span className={value.length < (minLength ? minLength : 0) || value.length > (maxLength ? maxLength : 10000) ? 'red' : 'green'}>{value.length}</span> )
            </small>
        </div>
    );
};