import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { FileDrop } from "./FileDrop";

interface Props {
    className?: string;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const ImagesFormPart = ({ className, title, dispatch }: Props) => {

    const handleImagesChange = (files: File[] | null) => {
        if (files && files.length > 0) {
            dispatch({ type: "IMAGES_CHANGE", payload: files });
        }
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Wybierz własne grafiki'}</h3>
            <FileDrop defaultValue="Upuść tutaj" fileType="image" multiple handler={handleImagesChange} />
        </div>
    );
};