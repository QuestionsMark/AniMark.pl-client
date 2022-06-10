import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useHome } from "../../../contexts/homeContext";
import { usePopup } from "../../../contexts/popupContext";
import { useUser } from "../../../contexts/userContext";
import { AnimeForm } from "../../../types";
import { fetchTool } from "../../../utils/fetchHelper";
import { getData } from "../../../utils/getData";
import { ButtonPlus } from "../../common/ButtonPlus";

export const AnimeOnTopQuestion = () => {

    const componentRef = useRef<HTMLDivElement>(null);

    const { user } = useUser();
    const { setResponsePopup } = usePopup();
    const { animeOnTop, setAnimeOnTop } = useHome();

    const [vote, setVote] = useState<string>('');
    const [anime, setAnime] = useState<AnimeForm[] | null>(null);

    const handleVote = async () => {
        if (!animeOnTop) return;
        setVote('');
        const response = await fetchTool('anime-on-top/vote', 'POST', { aotId: animeOnTop._id, userId: user.userId, vote });
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        getData('anime-on-top/actual', setAnimeOnTop, componentRef);
    };

    const formAnimeList = () => {
        if (!anime) return;
        return anime.map(a => <MenuItem key={a._id} value={a.title}>{a.title}</MenuItem>);
    };

    useEffect(() => {
        getData('anime/form', setAnime, componentRef);
    }, []);

    return (
        <div ref={componentRef} className="main__subsection anime-on-top__question">
            <h3 className="anime-on-top__subtitle anime-on-top__subtitle--center anime-on-top__results-title">Które anime według Ciebie jest najlepsze?</h3>
            <div className="anime-on-top__form">
                <FormControl id="select">
                    <InputLabel id="demo-simple-select-filled-label">Anime</InputLabel>
                    <Select
                        value={vote}
                        onChange={(e) => setVote(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {formAnimeList()}
                    </Select>
                </FormControl>
                <div className="recommended-anime__buttons">
                    <ButtonPlus disabled={vote ? false : true} handler={handleVote}>Zagłosuj</ButtonPlus>
                </div>
            </div>
        </div>
    );
};