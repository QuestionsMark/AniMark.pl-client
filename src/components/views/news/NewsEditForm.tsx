import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useReducer } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../../contexts/popupContext";
import { useValidation } from "../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../reducers/formReducer";
import { NewsEditEntity } from "../../../types";
import { fetchWithFileUpload } from "../../../utils/fetchHelper";
import { SubmitButton } from "../../common/SubmitButton";
import { DescriptionFormPart } from "../../formElements/DescriptionFormInput";
import { GraphicsToChooseFormPart } from "../../formElements/GraphicsToChooseFormPart";
import { ImagesFormPart } from "../../formElements/ImagesFormPart";
import { ImagesPreviewFormPart } from "../../formElements/ImagesPreviewFormPart";
import { OtherLinksFormPart } from "../../formElements/OtherLinksFormPart";
import { SavedImagesFormPart } from "../../formElements/SavedImagesFormPart";
import { TitleFormPart } from "../../formElements/TitleFormInput";
import { ValidationFormPart } from "../../formElements/ValidationFormPart";
import { VideosFormPart } from "../../formElements/VideosFormPart";

interface Props {
    news: NewsEditEntity;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const NewsEditForm = ({ news, setRefresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const { newsId } = useParams();

    const [state, dispatch] = useReducer(formReducer, news) as [NewsEditEntity, Dispatch<FormAction>];
    const { errors } = useValidation(state, 'NEWS_EDIT', news);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (errors.length !== 0) return;
        const data = new FormData();
        if (state.images) {
            for (const img of state.images) {
                data.append('img', img);
            }
        }
        data.append('data', JSON.stringify(state));
        const { message, status } = await fetchWithFileUpload(`news/${newsId}`, 'PATCH', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
        setResponsePopup({ message, open: true, status })
    };

    const titleFormInputComponent = useMemo(() => <TitleFormPart dispatch={dispatch} value={state.title} className="main__subsection" />, [state.title]);
    const DescriptionFormInputComponent = useMemo(() => <DescriptionFormPart dispatch={dispatch} value={state.description} className="main__subsection" textareaClassName="news__form-textarea" />, [state.description]);
    const videosFormPartComponent = useMemo(() => <VideosFormPart dispatch={dispatch} value={state.videos} className="main__subsection" maxCount={6} title="Filmy*" />, [state.videos]);
    const otherLinksFormPartComponent = useMemo(() => <OtherLinksFormPart dispatch={dispatch} value={state.otherLinks} className="main__subsection" maxCount={10} title="Odnośniki*" />, [state.otherLinks]);
    const savedImagesFormPartComponent = useMemo(() => <SavedImagesFormPart images={news.savedImages} path={`news/${newsId}`} setRefresh={setRefresh} className="main__subsection" />, [news.savedImages, newsId, setRefresh]);
    const graphicsToChooseFormPartComponent = useMemo(() => <GraphicsToChooseFormPart dispatch={dispatch} graphicsCount={state.choosedImages.length + state.preview.length + state.savedImages.length} value={state.choosedImages} savedImages={state.savedImages} className="main__subsection" />, [state.choosedImages, state.preview.length, state.savedImages]);
    const imagesPreviewFormPartComponent = useMemo(() => <ImagesPreviewFormPart dispatch={dispatch} preview={state.preview} sizeLimit={524288} className="main__subsection" />, [state.preview]);

    useEffect(() => {
        dispatch({ type: "FORM_SET", payload: news });
    }, [news]);

    return (
        <div className="news-edit__form-container">
            <form className="form news__form" onSubmit={handleSubmit}>
                {titleFormInputComponent}
                {DescriptionFormInputComponent}
                {videosFormPartComponent}
                {otherLinksFormPartComponent}
                {savedImagesFormPartComponent}
                {graphicsToChooseFormPartComponent}
                <ImagesFormPart dispatch={dispatch} className="main__subsection" />
                {imagesPreviewFormPartComponent}
                <SubmitButton errors={errors.length} value="Aktualizuj artykuł" className="news__submit" />
                <ValidationFormPart errors={errors} />
            </form>
        </div>
    );
};