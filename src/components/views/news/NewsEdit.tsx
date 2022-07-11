import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../contexts/userContext";
import { useData } from "../../../hooks/useData";
import { NewsAPI } from "../../../types";
import { Loading } from "../../common/Loading";
import { SmallNotFound } from "../../common/SmallNotFound";
import { NewsEditForm } from "./NewsEditForm";

export const NewsEdit = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { newsId } = useParams();

    const { user } = useUser();

    const { data, setRefresh } = useData<NewsAPI | null>(`news/${newsId}`, componentRef, [newsId], true);

    const getNewsObject = () => {
        const { description, images, otherLinks, title, videos } = (({ _id, views, viewers, comments, createdAt, ...o }) => o)({ ...data as NewsAPI });
        return {
            description,
            title,
            videos,
            otherLinks,
            choosedImages: [],
            images: null,
            savedImages: images,
            preview: [],
        };
    };

    return (
        <main ref={componentRef} className="main__content news-edit">
            {data ? user.userId && [2].includes(user.rank) ? <NewsEditForm news={getNewsObject()} setRefresh={setRefresh} /> : <SmallNotFound /> : <Loading />}
        </main>
    );
};