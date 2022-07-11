import { format } from "date-fns";
import Popup from "reactjs-popup";
import { WhatsTheMelodyAPI } from "../../../types";
import { AudioComponent } from "../../common/Audio";
import { WhatsTheMelodyWinnerElement } from "./WhatsTheMelodyWinnerElement";

interface Props {
    wtm: WhatsTheMelodyAPI;
    observer?: (node: any) => void;
}

export const WhatsTheMelodyElement = ({ wtm, observer }: Props) => {

    const { _id, answears, comments, correctAnswear, createdAt, src, votes } = wtm;

    const showVotesAmount = () => {
        return votes.reduce((prev, v) => prev + v.votes.length, 0);
    };

    const showDifficulty = () => {
        const correctVotes = votes.find(v => v.title === correctAnswear)?.votes.length;
        if (!correctVotes) return null;
        const allVotes = showVotesAmount();
        const correctRatio = correctVotes * 100 / allVotes;
        if (allVotes === 0) return 'Niewyobrażalny!!!'
        if (correctRatio > 80) return 'Bardzo Łatwy';
        if (correctRatio > 60) return 'Łatwy';
        if (correctRatio > 40) return 'Średni';
        if (correctRatio > 20) return 'Trudny';
        return 'Bardzo trudny';
    };

    const showWinners = () => {
        const winners = votes.find(v => v.title === correctAnswear)?.votes;
        if (!winners) return null;
        return winners.map(w => <WhatsTheMelodyWinnerElement key={w} userId={w}/>);
    };

    return (
        <li ref={observer || null} className="main__subsection whats-the-melody__item">
            <h2 className="whats-the-melody__title">{correctAnswear}</h2>
            <div className="whats-the-melody__statistics">
                <div className="whats-the-melody__info">Oddane głosy: {showVotesAmount()}</div>
                <p className="whats-the-melody__info">Poziom trudności: {showDifficulty()}</p>
                <Popup trigger={<p className="whats-the-melody__info">Komentarze: {comments.length}</p>} on="hover" position="center center" arrow={false} className="normal-popup" >Przegląd komentarzy już wkrótce.</Popup>
                <div className="whats-the-melody__info">Szefostwo muzyczne: {showWinners()}</div>
            </div>
            <div className="whats-the-melody__audio">
                <AudioComponent id={src} />
            </div>
            <time className="whats-the-melody__date">{format(new Date(createdAt), 'd.M.yyyy')}r.</time>
        </li>
    );
};