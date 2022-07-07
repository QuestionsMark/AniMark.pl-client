import { Dispatch, SetStateAction } from "react";
import { SavedImageFormElement } from "./SavedImageFormElement";

interface Props {
    images: string[];
    path: string;
    className?: string;
    title?: string;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const SavedImagesFormPart = ({ className, images, path, title, setRefresh }: Props) => {

    const imagesList = () => {
        return images.map(i => <SavedImageFormElement key={i} src={i} path={path} setRefresh={setRefresh} />);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Obecne grafiki'}</h3>
            <ul className="form__saved-images-list">
                {imagesList()}
            </ul>
        </div>
    );
};