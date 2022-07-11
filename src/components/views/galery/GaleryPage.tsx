import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { AnimeImage, galeryAPI } from "../../../types";
import { IconButton } from "../../common/IconButton";
import { Loading } from "../../common/Loading";
import { GaleryImageElement } from "./GaleryImageElement";

export const GaleryPage = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { animeId } = useParams();
    const navigate = useNavigate();

    const { data } = useData<galeryAPI>(`anime/${animeId}/galery`, componentRef, [animeId], true);

    const imagesList = () => {
        if (!data) return null;
        return data.images.map(i => <GaleryImageElement key={i.src} img={i} />);
    }

    return (
        <main ref={componentRef} className="main__content galery-page">
            {data ? <>
                <IconButton handler={() => navigate('/galery')} icon={faCaretLeft} className="galery-page__return-icon" />
                <Link to={`/anime/${animeId}`} className="link galery-page__title">{data.title}</Link>
                {data.images.length && <ul className="galery-page__list">
                    {imagesList()}
                </ul>}
            </> : <Loading />}
        </main>
    );
};