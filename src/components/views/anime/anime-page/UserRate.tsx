import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { usePopup } from "../../../../contexts/popupContext";
import { useUser } from "../../../../contexts/userContext";
import { fetchTool } from "../../../../utils/fetchHelper";
import { AnimeButtons } from "../AnimeButtons";

interface Props {
    animeId: string;
    userRate: number | undefined;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const UserRate = ({ animeId, userRate, setRefresh }: Props) => {

    const { user } = useUser();
    const { setLoginPopup, setResponsePopup } = usePopup();

    const handleMouseEnter = (e: MouseEvent) => {
        const index = Number(e.currentTarget.getAttribute('data-id'));
        const stars = Array.from((e.currentTarget.parentElement as HTMLElement).children);
        stars.forEach((s, i) => {
            if (i + 1 <= index) {
                s.classList.add('special');
            } else {
                s.classList.remove('special');
            }
        });
    };
    const handleMouseLeave = (e: MouseEvent) => {
        const index = userRate || 0;
        const stars = Array.from((e.currentTarget.parentElement as HTMLElement).children);
        stars.forEach((s, i) => {
            if (i + 1 <= index) {
                s.classList.add('special');
            } else {
                s.classList.remove('special');
            }
        })
    };

    const handleUserRateChange = async (e: MouseEvent) => {
        if (!user.userId) return setLoginPopup({ message: '', open: true, status: false });
        const { message, status } = await fetchTool(`anime/${animeId}/rate`, 'PUT', { rate: Number(e.currentTarget.getAttribute('data-id')), userId: user.userId });
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    const starList = () => {
        const stars = [];
        for (let i = 1; i <= (userRate || 0); i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} className="anime-page__user-rate-stars-icon special" data-id={i} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleUserRateChange} />);
        }
        const emptyStarsAmount = (userRate || 0) * 1 + 1;
        for (let i = emptyStarsAmount; i <= 10; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} className="anime-page__user-rate-stars-icon" data-id={i} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleUserRateChange} />);
        }
        return stars;
    };

    return (
        <div className="anime-page__user-rate">
            <h3 className="anime-page__subtitle anime-page__user-rate-title">Podziel się swoją oceną:</h3>
            <ul className="anime-page__user-rate-stars-list">
                {starList()}
            </ul>
            <AnimeButtons animeId={animeId} className="anime-page__user-rate-anime-status" />
        </div>
    );
};