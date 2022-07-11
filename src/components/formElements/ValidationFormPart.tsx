interface Props {
    errors: string[];
}

export const ValidationFormPart = ({ errors }: Props) => {

    const validationList = () => {
        return errors.map(e => <small key={e} className="form__validation-error">{e}</small>);
    };

    return (
        <>
            {errors.length > 0 &&
                <ul className="form__validation-list">
                    {validationList()}
                </ul>
            }
        </>
    );
};