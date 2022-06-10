import { useHome } from "../../../contexts/homeContext";
import { AnimeOnTopPopulateAPI } from "../../../types";
import { AnimeOnTopResultElement } from "./AnimeOnTopResultElement";

export const AnimeOnTopResults = () => {

    const { animeOnTop } = useHome();
    const { votes } = animeOnTop as AnimeOnTopPopulateAPI;

    const getAllVotes = () => {
        if (!animeOnTop) return 0;
        return animeOnTop.votes.reduce((p, a) => p + a.votes.length, 0);
    };

    const resultsList = () => {
        const allVotes = getAllVotes();
        const sorted = [...votes].sort((a, b) => {
            if (a.votes.length > b.votes.length) return 1;
            if (a.votes.length < b.votes.length) return -1;
            return 0;
        })
        return sorted.map(v => <AnimeOnTopResultElement key={v.title} result={v} allVotes={allVotes} />);
    };

    return (
        <div className="main__subsection anime-on-top__results">
            <h3 className="anime-on-top__subtitle anime-on-top__subtitle--center anime-on-top__results-title">Anime tygodnia według użytkowników!</h3>
            <div className="anime-on-top__results">
                {resultsList()}
            </div>
            <p className="anime-on-top__all-votes">Łącznie oddano głosów: {getAllVotes()}</p>
        </div>
    );
};