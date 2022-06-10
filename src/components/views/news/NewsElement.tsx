import { faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useUser } from "../../../contexts/userContext";
import { NewsCondensedAPI } from "../../../types";
import { Image } from "../../common/Image";
import { Notification } from "./Notification";

interface Props {
    news: NewsCondensedAPI;
    observer?: (node: any) => void;
}

export const NewsElement = ({ news, observer }: Props) => {

    const { user } = useUser();

    const { _id, comments, createdAt, description, imageSrc, title, viewers, views } = news;

    const notificationComponent = () => {
        if (user.logged) {
            const isNew = viewers.findIndex(v => v === user.userId) === -1;
            if (!isNew) return null;
            return <Notification />;
        }
        return null;
    };

    return (
        <article ref={observer ? observer : null} className="news-article">
            {notificationComponent()}
            <div className="news-article__img-wrapper">
                <Image alt="Miniatura nowości" src={imageSrc} />
            </div>
            <div className="news-article__content">
                <Link to={`/news/${_id}`} className="news-article__title">{title}</Link>
                <p className="text news-article__intro">{description}</p>
                <div className="news-article__statistics">
                    <p className="news-article__stat">
                        <FontAwesomeIcon icon={faComment} className="news-article__icon" />
                        {comments}
                    </p>
                    <p className="news-article__stat">
                        <FontAwesomeIcon icon={faEye} className="news-article__icon" />
                        {views}
                    </p>
                    <p className="news-article__stat">{formatDistanceToNow(new Date(createdAt))}</p>
                </div>
            </div>
        </article>
    );
};