import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { FileDrop } from "./FileDrop";

interface Props {
    title?: string;
    className?: string;
    dispatch: Dispatch<FormAction>;
}

export const AnimeCreateImagesFormPart = ({ dispatch, className, title }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Grafiki'}</h3>
            <FileDrop defaultValue="Upuśc tło" fileType="image" handler={(files) => dispatch({ type: 'BACKGROUND_CHANGE', payload: files })} />
            <FileDrop defaultValue="Upuśc baner" fileType="image" handler={(files) => dispatch({ type: 'BANER_CHANGE', payload: files })} />
            <FileDrop defaultValue="Upuśc okładkę" fileType="image" handler={(files) => dispatch({ type: 'MINI_CHANGE', payload: files })} />
        </div>
    );
};