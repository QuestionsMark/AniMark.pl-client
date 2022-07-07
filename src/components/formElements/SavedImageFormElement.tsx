import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { usePopup } from "../../contexts/popupContext";
import { fetchTool } from "../../utils/fetchHelper";
import { ConfirmIconButton } from "../common/ConfirmIconButton";
import { Image } from "../common/Image";

interface Props {
    src: string;
    path: string;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const SavedImageFormElement = ({ src, path, setRefresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const handleDelete = async () => {
        const { message, status } = await fetchTool(`${path}/image/${src}`, 'DELETE');
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <li className="form__saved-images-item">
            <Image alt="Podgląd" src={src} className="img--natural img--radius" />
            <ConfirmIconButton handler={handleDelete} icon={faMinus} question="Czy na pewno chcesz usunąć tę grafikę?" className="form__saved-images-delete-icon" />
        </li>
    );
};