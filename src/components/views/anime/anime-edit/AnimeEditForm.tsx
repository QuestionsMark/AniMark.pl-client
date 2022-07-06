import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../../../contexts/popupContext";
import { useValidation } from "../../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../../reducers/formReducer";
import { AnimeEditEntity, AnimeSeason, TypeFormListAPI } from "../../../../types";
import { fetchTool, fetchWithFileUpload } from "../../../../utils/fetchHelper";
import { getValidationMessage } from "../../../../utils/getValidationMessage";
import { SubmitButton } from "../../../common/SubmitButton";
import { AnimeEditImagesFormPart } from "../../../formElements/AnimeEditImagesFormPart";
import { AnimeEditSoundtracksFormPart } from "../../../formElements/AnimeEditSoundtracksFormPart";
import { AnimeInfoFormPart } from "../../../formElements/AnimeInfoFormPart";
import { KindFormPart } from "../../../formElements/KindFormPart";
import { SavedSoundtracksFormPart } from "../../../formElements/SavedSoundtracksFormPart";
import { SeasonsFormPart } from "../../../formElements/SeasonsFormPart";
import { SoundtracksFormPart } from "../../../formElements/SoundtracksFormPart";
import { SoundtracksPreviewFormPart } from "../../../formElements/SoundtracksPreviewFormPart";
import { TitleFormPart } from "../../../formElements/TitleFormInput";
import { TypesFormPart } from "../../../formElements/TypesFormPart";
import { ValidationFormPart } from "../../../formElements/ValidationFormPart";
import { WatchLinkFormPart } from "../../../formElements/WatchLinkFormPart";

interface Props {
    types: TypeFormListAPI[];
    seasons: AnimeSeason[];
    anime: AnimeEditEntity;
    amount: number;
    handleSearchPhraseChange: (text: string) => void;
    hasMore: boolean;
    loading: boolean;
    page: number;
    searchPhrase: string;
    setPage: Dispatch<SetStateAction<number>>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AnimeEditForm = ({ anime, seasons, types, amount, hasMore, loading, page, searchPhrase, handleSearchPhraseChange, setPage, setRefresh }: Props) => {

    const componentRef = useRef(null);

    const { setResponsePopup } = usePopup();
    const { animeId } = useParams();

    const [state, dispatch] = useReducer(formReducer, anime) as [AnimeEditEntity, Dispatch<FormAction>];
    const { errors } = useValidation(state, 'ANIME_EDIT', anime);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (errors.length !== 0) return;
        const restData = {
            kind: state.kind,
            epizodeDuration: state.epizodeDuration,
            epizodesCount: state.epizodesCount,
            hours: state.hours,
            minutes: state.minutes,
            productionYear: state.productionYear,
            scenario: state.scenario,
            seasons: state.seasons,
            title: state.title,
            types: state.types,
            watchLink: state.watchLink,
            soundtracksPreview: state.soundtracksPreview,
        };
        dispatch({ type: 'FORM_SET', payload: anime });
        setResponsePopup({ message: 'Poczekaj chwilkę, próbuję zapisać nowe anime...', open: true, status: true });
        const { status, message, validation } = await fetchTool(`anime/${animeId}`, 'PATCH', restData);
        if (!status) return setResponsePopup({ message: getValidationMessage(message, validation), open: true, status });
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    // const savedImagesFormPartComponent = useMemo(() => <SavedImagesFormPart images={anime.savedImages} path={`news/${newsId}`} setRefresh={setRefresh} className="main__subsection" />, [anime.savedImages, newsId, setRefresh]);

    const kindFormPartComponent = useMemo(() => <KindFormPart dispatch={dispatch} value={state.kind} className="main__subsection" />, [state.kind]);

    const titleFormInputComponent = useMemo(() => <TitleFormPart dispatch={dispatch} value={state.title} className="main__subsection" />, [state.title]);

    const infoFormPartComponent = useMemo(() => <AnimeInfoFormPart dispatch={dispatch} scenario={state.scenario} productionYear={state.productionYear} epizodeDuration={state.epizodeDuration} epizodesCount={state.epizodesCount} hours={state.hours} kind={state.kind} minutes={state.minutes} className="main__subsection" />, [state.epizodeDuration, state.epizodesCount, state.hours, state.kind, state.minutes, state.productionYear, state.scenario]);

    const watchLinkFormPartComponent = useMemo(() => <WatchLinkFormPart dispatch={dispatch} value={state.watchLink} className="main__subsection" />, [state.watchLink]);

    const typesFormPartComponent = useMemo(() => types && <TypesFormPart dispatch={dispatch} value={state.types} types={types} className="main__subsection" />, [state.types, types]);

    const seasonsFormPartComponent = useMemo(() => seasons && <SeasonsFormPart
        seasons={seasons}
        value={state.seasons}
        amount={amount}
        handleSearchPhraseChange={handleSearchPhraseChange}
        hasMore={hasMore}
        loading={loading}
        page={page}
        searchPhrase={searchPhrase}
        setPage={setPage}
        className="main__subsection"
        dispatch={dispatch}
    />, [amount, hasMore, loading, page, searchPhrase, seasons, state.seasons]);

    const savedSoundtracksFormPartComponent = useMemo(() => <SavedSoundtracksFormPart dispatch={dispatch} soundtracks={anime.savedSoundtracks} path={`anime/${animeId}`} setRefresh={setRefresh} className="main__subsection" />, [anime.savedSoundtracks, animeId, setRefresh]);

    const soundtracksFormPartComponent = useMemo(() => <AnimeEditSoundtracksFormPart dispatch={dispatch} setRefresh={setRefresh} soundtracks={state.soundtracks} soundtracksPreview={state.soundtracksPreview} maxCount={5} className="main__subsection form__soundtracks" title="Dodaj soundtrack" />, [setRefresh, state.soundtracks, state.soundtracksPreview]);

    const soundtracksPreviewComponent = useMemo(() => <SoundtracksPreviewFormPart dispatch={dispatch} sizeLimit={7340032} preview={state.soundtracksPreview} className="main__subsection" />, [state.soundtracksPreview]);

    const imagesFormPartComponent = useMemo(() => <AnimeEditImagesFormPart dispatch={dispatch} preview={state.animeImagesPreview} sizeLimit={524288} backgroundFile={state.background} banerFile={state.baner} miniFile={state.mini} setRefresh={setRefresh} className="main__subsection" />, [state.animeImagesPreview]);

    useEffect(() => {
        dispatch({ type: "FORM_SET", payload: anime });
    }, [anime]);

    return (
        <div ref={componentRef} className="news-edit__form-container">
            <form className="form news__form" onSubmit={handleSubmit}>
                {kindFormPartComponent}
                {titleFormInputComponent}
                {infoFormPartComponent}
                {watchLinkFormPartComponent}
                {typesFormPartComponent}
                {seasonsFormPartComponent}
                <div className="main__subsection">
                    <SubmitButton errors={errors.length} value="Aktualizuj anime" className="anime-create__submit" />
                    <ValidationFormPart errors={errors} />
                </div>
                {imagesFormPartComponent}
                {savedSoundtracksFormPartComponent}
                {soundtracksPreviewComponent}
                {soundtracksFormPartComponent}
            </form>
        </div>
    );
};