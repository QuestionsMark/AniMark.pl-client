export const textHelper = (text: string) => {
    return text.split(/\r?\n/).map((fragment, i) => <p key={i} className="text" >{fragment}</p>);
};