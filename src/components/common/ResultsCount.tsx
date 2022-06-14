interface Props {
    amount: number;
    className?: string;
    value: string;
}

export const ResultsCount = ({ amount, className, value }: Props) => {
    return (
        <p className={`main__subsection${className ? ' ' + className : ''}`}>
            {value}: <span className={`${amount > 0 ? 'green' : 'red'}`}>{amount}</span>
        </p>
    );
};