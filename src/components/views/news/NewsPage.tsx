import { faComment, faEye, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { NewsAPI } from "../../../types";
import { textHelper } from "../../../utils/textHelper";
import { AdminOption } from "../../common/AdminOption";
import { Comments } from "../../common/Comments";
import { Loading } from "../../common/Loading";
import { NewsGrapgicElement } from "./NewsGrapgicElement";
import { NewsVideoElement } from "./NewsVideoElement";

export const NewsPage = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { newsId } = useParams();

    const { data, setRefresh } = useData<NewsAPI | null>(`news/${newsId}`, componentRef);

    const otherLinksList = () => {
        if (!data) return;
        return data.otherLinks.map((l, i) => <a href={l.src} key={String(i)} target="_blank" rel="noreferrer" className="link news-page__other-links-link">{l.note}</a>);
    };
    const videosList = () => {
        if (!data) return;
        return data.videos.map((v, i) => <NewsVideoElement key={String(i)} src={v} />);
    };
    const imagesList = () => {
        if (!data) return;
        return data.images.map(i => <NewsGrapgicElement key={i} src={i} />);
    };

    return (
        <main ref={componentRef} className="main__content news-page">
            {data ? <div className="news-page__content">
                {/* <AdminOption handler={handle} icon={faGear} className="news-page__admin-option" /> */}
                <h2 className="news-page__title">{data.title}</h2>
                <div className="news-page__container">
                    <div className="main__subsection news-page__text text text--indent">
                        {textHelper(data.description)}
                    </div>
                    {data.videos.length > 0 && <div className="main__subsection news-page__videos">
                        <h3 className="news-page__subtitle">Zobacz też:</h3>
                        <ul className="news-page__list">
                            {videosList()}
                        </ul>
                    </div>}
                    {/* <SRLWrapper> */}
                    <div className="main__subsection news-page__images">
                        <h3 className="news-page__subtitle">Zobacz grafiki:</h3>
                        <ul className="news-page__list">
                            {imagesList()}
                        </ul>
                    </div>
                    {/* </SRLWrapper> */}
                    {data.otherLinks.length > 0 && <div className="main__subsection news-page__other-links">
                        <h3 className="news-page__subtitle">Dodadkowe odnośniki:</h3>
                        <ul className="news-page__list news-page__other-links-list">
                            {otherLinksList()}
                        </ul>
                    </div>}
                    <div className="main__subsection news-page__statistics">
                        <p className="news-page__statistics-item"><FontAwesomeIcon icon={faEye} className="news-page__statistics-icon" />{data.views}</p>
                        <p className="news-page__statistics-item"><FontAwesomeIcon icon={faComment} className="news-page__statistics-icon" />{data.comments.length}</p>
                        <p className="news-page__statistics-item">{formatDistanceToNow(new Date(data.createdAt))}</p>
                    </div>
                    <Comments collectionId={newsId as string} comments={data.comments} collection="NEWS" setRefresh={setRefresh} />
                </div>
            </div> : <Loading />}
        </main>
    );
};