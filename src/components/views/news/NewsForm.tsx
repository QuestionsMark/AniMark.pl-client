import { Dispatch, FormEvent, SetStateAction, useMemo, useReducer } from "react";
import { usePopup } from "../../../contexts/popupContext";
import { useValidation } from "../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../reducers/formReducer";
import { NewsFormEntity } from "../../../types";
import { fetchWithFileUpload } from "../../../utils/fetchHelper";
import { CloseButton } from "../../common/CloseButton";
import { SubmitButton } from "../../common/SubmitButton";
import { DescriptionFormPart } from "../../formElements/DescriptionFormInput";
import { GraphicsToChooseFormPart } from "../../formElements/GraphicsToChooseFormPart";
import { ImagesFormPart } from "../../formElements/ImagesFormPart";
import { ImagesPreviewFormPart } from "../../formElements/ImagesPreviewFormPart";
import { OtherLinksFormPart } from "../../formElements/OtherLinksFormPart";
import { TitleFormPart } from "../../formElements/TitleFormInput";
import { ValidationFormPart } from "../../formElements/ValidationFormPart";
import { VideosFormPart } from "../../formElements/VideosFormPart";

interface Props {
    close: () => void;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

const defaultNewsForm: NewsFormEntity = {
    choosedImages: [],
    description: '',
    images: null,
    otherLinks: [],
    preview: [],
    title: '',
    videos: [],
}

export const NewsForm = ({ close, setRefresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const [state, dispatch] = useReducer(formReducer, defaultNewsForm) as [NewsFormEntity, Dispatch<FormAction>];
    const { errors } = useValidation(state, 'NEWS_CREATE');

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
        const { message, status } = await fetchWithFileUpload('news', 'POST', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => !state);
        close();
    };

    const titleFormInputComponent = useMemo(() => <TitleFormPart dispatch={dispatch} value={state.title} className="news__form-section" />, [state.title]);
    const DescriptionFormInputComponent = useMemo(() => <DescriptionFormPart dispatch={dispatch} value={state.description} className="news__form-section" textareaClassName="news__form-textarea" />, [state.description]);
    const videosFormPartComponent = useMemo(() => <VideosFormPart dispatch={dispatch} value={state.videos} className="news__form-section" maxCount={6} title="Filmy*" />, [state.videos]);
    const otherLinksFormPartComponent = useMemo(() => <OtherLinksFormPart dispatch={dispatch} value={state.otherLinks} className="news__form-section" maxCount={10} title="Odnośniki*" />, [state.otherLinks]);
    const graphicsToChooseFormPartComponent = useMemo(() => <GraphicsToChooseFormPart dispatch={dispatch} graphicsCount={state.choosedImages.length + state.preview.length} value={state.choosedImages} className="news__form-section" />, [state.choosedImages, state.preview.length]);
    const imagesPreviewFormPartComponent = useMemo(() => <ImagesPreviewFormPart dispatch={dispatch} preview={state.preview} sizeLimit={524288} className="news__form-section" />, [state.preview]);

    return (
        <div className="news__form-container">
            <CloseButton handler={close} className="news__form-close-icon" />
            <h2 className="main__title news__form-title">Nowy artykuł</h2>
            <form className="form news__form" onSubmit={handleSubmit}>
                {titleFormInputComponent}
                {DescriptionFormInputComponent}
                {videosFormPartComponent}
                {otherLinksFormPartComponent}
                {graphicsToChooseFormPartComponent}
                <ImagesFormPart dispatch={dispatch} className="news__form-section" />
                {imagesPreviewFormPartComponent}
                <SubmitButton errors={errors.length} value="Dodaj artykuł" className="news__submit" />
                <ValidationFormPart errors={errors} />
            </form>
        </div>
    );
};