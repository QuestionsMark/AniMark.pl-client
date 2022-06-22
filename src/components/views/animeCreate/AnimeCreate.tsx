import { Dispatch, FormEvent, useMemo, useReducer, useRef } from "react";
import { usePopup } from "../../../contexts/popupContext";
import { useData } from "../../../hooks/useData";
import { useSearch } from "../../../hooks/useSearch";
import { useValidation } from "../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../reducers/formReducer";
import { AnimeCreateEntity, TypeFormListAPI } from "../../../types";
import { fetchWithFileUpload } from "../../../utils/fetchHelper";
import { getValidationMessage } from "../../../utils/getValidationMessage";
import { Loading } from "../../common/Loading";
import { SubmitButton } from "../../common/SubmitButton";
import { AnimeCreateImagesFormPart } from "../../formElements/AnimeCreateImagesFormPart";
import { AnimeCreateImagesPreviewFormPart } from "../../formElements/AnimeCreateImagesPreviewFormPart";
import { AnimeInfoFormPart } from "../../formElements/AnimeInfoFormPart";
import { KindFormPart } from "../../formElements/KindFormPart";
import { SeasonsFormPart } from "../../formElements/SeasonsFormPart";
import { SoundtracksFormPart } from "../../formElements/SoundtracksFormPart";
import { SoundtracksPreviewFormPart } from "../../formElements/SoundtracksPreviewFormPart";
import { TitleFormPart } from "../../formElements/TitleFormInput";
import { TypesFormPart } from "../../formElements/TypesFormPart";
import { ValidationFormPart } from "../../formElements/ValidationFormPart";
import { WatchLinkFormPart } from "../../formElements/WatchLinkFormPart";

const animeCreate: AnimeCreateEntity = {
    background: null,
    baner: null,
    mini: null,
    kind: 'series',
    animeImagesPreview: {
        background: {
            size: 0,
            src: '',
        },
        baner: {
            size: 0,
            src: '',
        },
        mini: {
            size: 0,
            src: '',
        },
    },
    epizodeDuration: null,
    epizodesCount: null,
    hours: null,
    minutes: null,
    productionYear: null,
    scenario: '',
    seasons: [],
    soundtracks: null,
    soundtracksPreview: [],
    title: '',
    types: [],
    watchLink: '',
}

export const AnimeCreate = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { setResponsePopup } = usePopup();

    const [state, dispatch] = useReducer(formReducer, animeCreate) as [AnimeCreateEntity, Dispatch<FormAction>];

    const { errors } = useValidation(state, 'ANIME_CREATE');

    const { data: types } = useData<TypeFormListAPI[]>('types/form', componentRef);
    const { data: seasons, amount, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch('anime/seasons-form', 20);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (errors.length !== 0) return;
        const data = new FormData();
        data.append('file', state.background as File);
        data.append('file', state.baner as File);
        data.append('file', state.mini as File);
        for (const soundtrack of state.soundtracks as File[]) {
            data.append('file', soundtrack);
        }
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
        data.append('data', JSON.stringify(restData));
        dispatch({ type: 'FORM_SET', payload: animeCreate });
        setResponsePopup({ message: 'Poczekaj chwilkę, próbuję zapisać nowe anime...', open: true, status: true });
        const { status, message, validation } = await fetchWithFileUpload('anime', 'POST', data);
        if (!status) return setResponsePopup({ message: getValidationMessage(message, validation), open: true, status });
        setResponsePopup({ message, open: true, status });
    };

    const kindFormPartComponent = useMemo(() => <KindFormPart dispatch={dispatch} value={state.kind} className="anime-create__form-section main__subsection" />, [state.kind]);

    const titleFormInputComponent = useMemo(() => <TitleFormPart dispatch={dispatch} value={state.title} className="anime-create__form-section main__subsection" />, [state.title]);

    const infoFormPartComponent = useMemo(() => <AnimeInfoFormPart dispatch={dispatch} scenario={state.scenario} productionYear={state.productionYear} epizodeDuration={state.epizodeDuration} epizodesCount={state.epizodesCount} hours={state.hours} kind={state.kind} minutes={state.minutes} className="anime-create__form-section main__subsection" />, [state.epizodeDuration, state.epizodesCount, state.hours, state.kind, state.minutes, state.productionYear, state.scenario]);

    const watchLinkFormPartComponent = useMemo(() => <WatchLinkFormPart dispatch={dispatch} value={state.watchLink} className="anime-create__form-section main__subsection" />, [state.watchLink]);

    const typesFormPartComponent = useMemo(() => types && <TypesFormPart dispatch={dispatch} value={state.types} types={types} className="anime-create__form-section main__subsection" />, [state.types, types]);

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
        className="anime-create__form-section main__subsection"
        dispatch={dispatch}
    />, [amount, hasMore, loading, page, searchPhrase, seasons, state.seasons]);

    const soundtracksFormPartComponent = useMemo(() => <SoundtracksFormPart dispatch={dispatch} maxCount={5} className="anime-create__form-section main__subsection" />, []);

    const soundtracksPreviewComponent = useMemo(() => <SoundtracksPreviewFormPart dispatch={dispatch} sizeLimit={7340032} preview={state.soundtracksPreview} className="anime-create__form-section main__subsection" />, [state.soundtracksPreview]);

    const imagesFormPartComponent = useMemo(() => <AnimeCreateImagesFormPart dispatch={dispatch} className="anime-create__form-section main__subsection" />, []);

    const imagesPreviewComponent = useMemo(() => <AnimeCreateImagesPreviewFormPart dispatch={dispatch} sizeLimit={524288} preview={state.animeImagesPreview} className="anime-create__form-section main__subsection" />, [state.animeImagesPreview]);

    return (
        <main ref={componentRef} className="main__content anime-create">
            {types && seasons ? <form className="anime-create__form" onSubmit={handleSubmit}>
                {kindFormPartComponent}
                {titleFormInputComponent}
                {infoFormPartComponent}
                {watchLinkFormPartComponent}
                {typesFormPartComponent}
                {seasonsFormPartComponent}
                {imagesFormPartComponent}
                {imagesPreviewComponent}
                {soundtracksFormPartComponent}
                {soundtracksPreviewComponent}
                <div className="main__subsection">
                    <SubmitButton errors={errors.length} value="Dodaj nowe anime" className="anime-create__submit" />
                    <ValidationFormPart errors={errors} />
                </div>
            </form> : <Loading />}
        </main>
    );
};