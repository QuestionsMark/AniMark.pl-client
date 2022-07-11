interface Props {
    color: string;
    isFail: boolean;
    percent: string;
    title: string;
    votesAmount: number;
}

export const VoteResultsElement = ({ color, isFail, percent, title, votesAmount }: Props) => {
    return (
        <div className="recommended-anime__result">
            <p className="recommended-anime__result-percent-curtain" style={{ width: percent }}></p>
            <p className="recommended-anime__percent" style={{ color: isFail ? '#d14141' : color }}>{percent}</p>
            <p className="recommended-anime__result-title" style={{ color: isFail ? '#d14141' : color }}>{title}</p>
        </div>
    );
};