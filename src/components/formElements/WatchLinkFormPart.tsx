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

export const WatchLinkFormPart = ({ dispatch, value, className, maxLength, minLength, title }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Link do oglądania'}</h3>
            <input
                type="text"
                className="form__inp form__inp--part"
                placeholder={title ? title : 'Link do oglądania'}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={(e) => dispatch({ type: 'WATCH_LINK_CHANGE', payload: e.target.value })}
            />
        </div>
    );
};