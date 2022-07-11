import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useRightSide } from "../../../contexts/rightSideContext";
import { useUser } from "../../../contexts/userContext";
import { VoteResultsAPI } from "../../../types";
import { getData } from "../../../utils/getData";
import { AdminOption } from "../../common/AdminOption";
import { AudioComponent } from "../../common/Audio";
import { LoadingWithMargin } from "../../common/LoadingWithMargin";
import { VoteResultsElement } from "./VoteResultsElement";

interface Props {
    handleRollWhatsTheMelody: () => Promise<void>;
}

export const WhatsTheMelodyResults = ({ handleRollWhatsTheMelody }: Props) => {

    const componentRef = useRef<HTMLElement>(null);
    const { user } = useUser();
    const { whatsTheMelodyResults, setWhatsTheMelodyResults } = useRightSide();

    const getColor = (v: VoteResultsAPI) => {
        if (!whatsTheMelodyResults || v.title !== whatsTheMelodyResults.correctAnswear) return '';
        return '#5ec45e';
    };

    const getVotesAmount = () => {
        if (!whatsTheMelodyResults) return 0;
        return whatsTheMelodyResults.votes.reduce((p, a) => p + a.votes.length, 0);
    };

    const resultsList = () => {
        if (!whatsTheMelodyResults) return;
        const votesAmount = getVotesAmount();
        const results: VoteResultsAPI[] = [...whatsTheMelodyResults.votes].map(v => {
            if (v.votes.length !== 0) {
                const userVote = v.votes.findIndex(v => v === user.userId) !== -1;
                return {
                    isFail: v.title !== whatsTheMelodyResults.correctAnswear && userVote ? true : false,
                    percent: `${(v.votes.length * 100 / votesAmount).toFixed(1)}%`,
                    title: v.title,
                    votesAmount: v.votes.length,
                }
            }
            return {
                isFail: false,
                percent: '0.0%',
                title: v.title,
                votesAmount: v.votes.length,
            };
        });
        return results.map((v, i) => <VoteResultsElement key={String(i)} isFail={v.isFail} percent={v.percent} title={v.title} color={getColor(v)} votesAmount={v.votesAmount} />);
    };

    useEffect(() => {
        getData('whats-the-melody/actual/results', setWhatsTheMelodyResults, componentRef);
    }, []);

    return (
        <section ref={componentRef} className="right-side__section recommended-anime whats-the-melody">
            {whatsTheMelodyResults ? <>
                <AdminOption handler={handleRollWhatsTheMelody} icon={faRefresh} className="recommended-anime__admin-option" isRefresh />
                <h3 className="recommended-anime__title">Jaka to melodia?</h3>
                <div className="recommended-anime__audio">
                    <AudioComponent id={whatsTheMelodyResults.src} />
                </div>
                <div className="recommended-anime__results">
                    {resultsList()}
                </div>
                <p className="recommended-anime__votes"><strong>{getVotesAmount()}</strong> oddanych głosów</p>
            </> : <LoadingWithMargin marginHorizontal={0} marginVertical={100} />}
        </section>
    );
};