import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useHome } from "../../../contexts/homeContext";
import { usePopup } from "../../../contexts/popupContext";
import { useUser } from "../../../contexts/userContext";
import { useChecked } from "../../../hooks/useChecked";
import { didUserVote } from "../../../utils/checkFunctions";
import { fetchTool } from "../../../utils/fetchHelper";
import { getData } from "../../../utils/getData";
import { AdminOption } from "../../common/AdminOption";
import { AnimeOnTopQuestion } from "./AnimeOnTopQuestion";
import { AnimeOnTopResults } from "./AnimeOnTopResults";
import { AnimeOnTopWinner } from "./AnimeOnTopWinner";

export const AnimeOnTop = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { user } = useUser();
    const { setResponsePopup } = usePopup();
    const { animeOnTop, setAnimeOnTop } = useHome();

    const { isChecked, result } = useChecked(
        () => didUserVote(animeOnTop ? animeOnTop?.votes : null, user.userId),
        [animeOnTop, user],
        [animeOnTop, user],
        true
    );

    const handleRefresh = async () => {
        const response = await fetchTool('anime-on-top', 'POST');
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        getData('anime-on-top/actual', setAnimeOnTop, componentRef);
    };

    return (
        <section ref={componentRef} className="main__section anime-on-top">
            <AdminOption handler={handleRefresh} icon={faRefresh} className="anime-on-top__admin-option" isRefresh />
            <h2 className="main__title">Anime na Topie!</h2>
            {animeOnTop && animeOnTop.winner && <AnimeOnTopWinner />}
            {animeOnTop && animeOnTop.votes.length > 0 && <AnimeOnTopResults />}
            {!user.logged && <AnimeOnTopQuestion />}
            {user.logged && isChecked && !result && <AnimeOnTopQuestion />}
        </section>
    );
};