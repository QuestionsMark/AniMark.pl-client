import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { NewsAPI } from "../../../types";
import { Loading } from "../../common/Loading";
import { NewsEditForm } from "./NewsEditForm";

export const NewsEdit = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { newsId } = useParams();

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
            {data ? <NewsEditForm news={getNewsObject()} setRefresh={setRefresh} /> : <Loading />}
        </main>
    );
};