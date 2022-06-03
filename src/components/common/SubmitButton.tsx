interface Props {
    errors: number;
    value: string;
    className?: string;
}

export const SubmitButton = ({ errors, value, className }: Props) => {
    return <input type="submit" value={value} id="btn" className={`form__submit${className ? ' ' + className : ''}`} disabled={errors !== 0} />
};