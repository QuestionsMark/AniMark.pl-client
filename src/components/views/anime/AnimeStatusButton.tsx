import Popup from "reactjs-popup";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faEye, faHeart, faPencil, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientResponse } from "../../../types";

import { usePopup } from "../../../contexts/popupContext";
import { useUser } from "../../../contexts/userContext";
import { fetchApiTool, fetchTool } from "../../../utils/fetchHelper";

export type AnimeStatus = 'FAVORITE' | 'WATCHED' | 'STOPPED' | 'PROCESS_OF_WATCHING' | 'PLANNED';

interface Props {
    active: boolean;
    status: AnimeStatus;
    text: string;
    animeId: string;
}

export const AnimeStatusButton = ({ active, animeId, status, text }: Props) => {

    const { user, setUser } = useUser();

    const { setResponsePopup, setLoginPopup } = usePopup();

    const getStatusIcon = (): IconDefinition => {
        switch (status) {
            case 'FAVORITE':
                return faHeart;
            case 'PLANNED':
                return faPencil;
            case 'PROCESS_OF_WATCHING':
                return faEye;
            case 'STOPPED':
                return faStopwatch;
            case 'WATCHED':
                return faCheck;
        }
    };

    const handleStatusChange = async () => {
        if (user.logged) {
            let response: ClientResponse;
            switch (status) {
                case 'FAVORITE':
                    response = await fetchTool(`users/${user.userId}/favorite-anime/${animeId}`, 'PUT');
                    break;
                case 'PLANNED':
                    response = await fetchTool(`users/${user.userId}/planned/${animeId}`, 'PUT');
                    break;
                case 'PROCESS_OF_WATCHING':
                    response = await fetchTool(`users/${user.userId}/process-of-watching/${animeId}`, 'PUT');
                    break;
                case 'STOPPED':
                    response = await fetchTool(`users/${user.userId}/stopped/${animeId}`, 'PUT');
                    break;
                case 'WATCHED':
                    response = await fetchTool(`users/${user.userId}/watched/${animeId}`, 'PUT');
                    break;
            }
            if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
            const dataResponse = await fetchApiTool(`users/${user.userId}/user-data`);
            if (!dataResponse.status) return setResponsePopup({ message: dataResponse.message, open: true, status: dataResponse.status });
            setUser(state => ({ ...state, data: dataResponse.results }));
            return;
        }
        setLoginPopup({ message: '', open: true, status: false });
    };

    return (
        <Popup
            className="normal-popup"
            trigger={
                <div className={`anime__status-btn${active ? ' anime__status-btn-active' : ''}`} onClick={handleStatusChange}>
                    <FontAwesomeIcon icon={getStatusIcon()} className={`anime__status-icon${active ? ' anime__status-icon-active' : ''}`} />
                </div>
            }
            on="hover"
            position="top center"
            mouseEnterDelay={750}
        >
            {text}
        </Popup>
    );
};