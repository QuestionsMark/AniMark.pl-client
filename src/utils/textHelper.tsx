export const textHelper = (text: string) => {
    return text.split(/\r?\n/).map((fragment, i) => <p key={i} className="text" >{fragment}</p>);
};

export const textMaxLengthHelper = (text: string, limit: number) => {
    return text.length > limit || text.length === 0 ? '#e66565' : '#63b963';
};