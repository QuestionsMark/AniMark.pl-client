import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useRef } from "react";
import { HOST_ADDRESS } from "../../../../config";
import { usePopup } from "../../../../contexts/popupContext";
import { useUser } from "../../../../contexts/userContext";
import { fetchTool } from "../../../../utils/fetchHelper";
import { ConfirmIconButton } from "../../../common/ConfirmIconButton";
import { Image } from "../../../common/Image";

interface Props {
    background: string;
    isActive: boolean;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const ProfileBackgroundElement = ({ background, isActive, setRefresh }: Props) => {

    const bodyRef = useRef(document.body);
    const { user } = useUser();
    const { setResponsePopup } = usePopup();

    const handleBackgroundDelete = async () => {
        const { message, status } = await fetchTool(`users/${user.userId}/background/${background}`, 'DELETE');
        setResponsePopup({ message, open: true, status });
        if (!status) return;
        setRefresh(state => state === null ? false : !state);
    };

    const handleBackgroundChange = async () => {
        const { message, status } = await fetchTool(`users/${user.userId}/background/${background}`, 'PUT');
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
        bodyRef.current.style.backgroundImage = `url('${HOST_ADDRESS}/media/${background}')`;
    };

    return (
        <li className={`form__backgrounds-item${isActive ? ' active' : ''}`}>
            <div className="form__backgrounds-img-wrapper" onClick={handleBackgroundChange}>
                <Image alt="Tło profilu" src={background} className="img--natural form__backgrounds-img" />
            </div>
            <ConfirmIconButton handler={handleBackgroundDelete} icon={faMinus} question="Czy napewno chcesz usunąć to tło?" className="form__backgrounds-delete-icon" />
        </li>
    );
};