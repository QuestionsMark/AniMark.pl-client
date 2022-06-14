interface Props {
    className?: string;
    value: string;
    handleSearch: (text: string) => void;
}

export const Search = ({ className, value, handleSearch }: Props) => {
    return (
        <input type="text" className={`form__search${className ? ' ' + className : ''}`} placeholder="Szukaj" value={value} onChange={e => handleSearch(e.target.value)} />
    );
}