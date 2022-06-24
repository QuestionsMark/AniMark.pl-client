// import { faMinus } from "@fortawesome/free-solid-svg-icons";
// import { Dispatch, SetStateAction } from "react";
// import { useParams } from "react-router-dom";
// import { usePopup } from "../../../contexts/popupContext";
// import { fetchTool } from "../../../utils/fetchHelper";
// import { ConfirmIconButton } from "../../common/ConfirmIconButton";
import { Image } from "../../common/Image";

interface Props {
    src: string;
    // setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const NewsGrapgicElement = ({ src }: Props) => {

    // const { newsId } = useParams();
    // const { setResponsePopup } = usePopup();

    // const handleDelete = async () => {
    //     const { message, status } = await fetchTool(`news/${newsId}/image/${src}`, 'DELETE');
    //     setResponsePopup({ message, open: true, status });
    //     setRefresh(state => state === null ? false : !state);
    // };

    return (
        <li className="news-page__images-item">
            <Image alt="Artykuł" src={src} className="img--natural" />
            {/* <ConfirmIconButton handler={handleDelete} icon={faMinus} question="Czy napewno chcesz usunąc tę grafikę?" className="news-page__images-icon" /> */}
        </li>
    );
};