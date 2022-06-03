import { faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NewsAPICondensed } from "../../../types";
import { Notification } from "./Notification";

interface Props {
    news: NewsAPICondensed;
    observer?: (node: any) => void;
}

export const NewsElement = ({ news, observer }: Props) => {

    const { status, user } = { status: false, user: { _id: 'siema' } };

    const { _id, comments, createdAt, description, imageSrc, title, viewers, views } = news;

    const handleViewsBump = () => {
        return;
    };

    const notificationComponent = () => {
        if (status && JSON.stringify(user) !== '{}') {
            const isNew = viewers.findIndex(v => v === user._id) === -1;
            if (!isNew) return null;
            return <Notification />;
        }
        return null;
    };

    return (
        <article ref={observer ? observer : null} className="news-article">
            {notificationComponent()}
            <div className="news-article__img-wrapper">
                {/* <Image /> */}
            </div>
            <div className="news-article__content">
                <Link to={`/news/${_id}`} className="news-article__title" onClick={handleViewsBump}>{title}</Link>
                <p className="text news-article__intro">{description}</p>
                <div className="news-article__statistics">
                    <p className="news-article__stat">
                        <FontAwesomeIcon icon={faEye} className="news-article__icon" />
                        {views}
                    </p>
                    <p className="news-article__stat">
                        <FontAwesomeIcon icon={faComment} className="news-article__icon" />
                        {/* {comments} */}
                    </p>
                    {/* <p className="news-article__stat">{createdAt}</p> */}
                </div>
            </div>
        </article>
    );
};