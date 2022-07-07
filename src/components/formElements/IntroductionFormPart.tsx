import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { Introduction } from "../../types";

interface Props {
    title?: string;
    className?: string;
    value: Introduction;
    dispatch: Dispatch<FormAction>;
}

export const IntroductionFormPart = ({ className, title, value, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Opis'}</h3>
            <div className="form__introduction-content">
                <input type="text" className="form__inp form__introduction-title-inp" value={value.title} onChange={(e) => dispatch({ type: 'INTRODUCTION_CHANGE', payload: { type: 'TITLE', value: e.target.value } })} maxLength={150} placeholder="Tytuł" />
                <textarea className="form__textarea form__introduction-description-textarea" value={value.description} onChange={(e) => dispatch({ type: 'INTRODUCTION_CHANGE', payload: { type: 'DESCRIPTION', value: e.target.value } })} placeholder="Opis" />
            </div>
        </div>
    );
};