import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AddButton } from "../common/AddButton";
import { VideoFormElement } from "./VideoFormElement";

interface Props {
    title?: string;
    className?: string;
    maxCount?: number;
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const VideosFormPart = ({ className, maxCount, title, value, dispatch }: Props) => {

    const videoInputList = () => {
        return value.map((v, i) => <VideoFormElement key={String(i)} dispatch={dispatch} index={i} src={v} />);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Filmy'}</h3>
            <ul className="form__videos-list">
                {videoInputList()}
                {value.length < (maxCount ? maxCount : 50) && <AddButton handler={() => dispatch({ type: 'VIDEOS_ADD' })} />}
            </ul>
            <div className="form__instruction">
                <p className="form__instruction-title">Aby dodać link do filmu YouTube podążaj tymi krokami:</p>
                <small className="form__instruction-step">- Znajdź film youTube</small>
                <small className="form__instruction-step">- Kliknij UDOSTĘPNIJ pod filmem</small>
                <small className="form__instruction-step">- Wybierz pierwszą opcję czyli "Umieść"</small>
                <small className="form__instruction-step">- Po prawej stronie znajdź: src="..."</small>
                <small className="form__instruction-step">- Twój link znajduje się w cudzysłowie atrybutu src</small>
            </div>
        </div>
    );
};