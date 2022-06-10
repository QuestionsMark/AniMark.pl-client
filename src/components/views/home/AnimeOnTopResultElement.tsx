import { AOTVote } from "../../../types";

interface Props {
    allVotes: number;
    result: AOTVote;
}

export const AnimeOnTopResultElement = ({ allVotes, result }: Props) => {
    return (
        <div className="anime-on-top__result">
            <p className="anime-on-top__result-percent-curtain" style={{ width: `${result.votes.length / allVotes * 100}%` }}></p>
            <p className="anime-on-top__percent">{`${(result.votes.length / allVotes * 100).toFixed(2)}%`}</p>
            <p className="anime-on-top__result-title">{result.title}</p>
        </div>
    );
};