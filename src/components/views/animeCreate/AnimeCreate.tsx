import { Dispatch, FormEvent, useMemo, useReducer, useRef } from "react";
import { useData } from "../../../hooks/useData";
import { useSearch } from "../../../hooks/useSearch";
import { useValidation } from "../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../reducers/formReducer";
import { AnimeCreateEntity, TypeFormListAPI } from "../../../types";
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

    const [state, dispatch] = useReducer(formReducer, animeCreate) as [AnimeCreateEntity, Dispatch<FormAction>];

    const { errors } = useValidation(state, 'ANIME_CREATE');

    const { data: types } = useData<TypeFormListAPI[]>('types/form', componentRef);
    const { data: seasons, amount, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch('anime/seasons-form', 20);

    const handleSubmit = async (e: FormEvent) => {
        return;
    };

    const titleFormInputComponent = useMemo(() => <TitleFormPart dispatch={dispatch} value={state.title} className="anime-create__form-section" />, [state.title]);
    const kindFormPartComponent = useMemo(() => <KindFormPart dispatch={dispatch} value={state.kind} className="anime-create__form-section" />, [state.kind]);
    const infoFormPartComponent = useMemo(() => <AnimeInfoFormPart dispatch={dispatch} scenario={state.scenario} productionYear={state.productionYear} epizodeDuration={state.epizodeDuration} epizodesCount={state.epizodesCount} hours={state.hours} kind={state.kind} minutes={state.minutes} className="anime-create__form-section" />, [state.epizodeDuration, state.epizodesCount, state.hours, state.kind, state.minutes, state.productionYear, state.scenario]);
    const watchLinkFormPartComponent = useMemo(() => <WatchLinkFormPart dispatch={dispatch} value={state.watchLink} className="anime-create__form-section" />, [state.watchLink]);
    const typesFormPartComponent = useMemo(() => types && <TypesFormPart dispatch={dispatch} value={state.types} types={types} className="anime-create__form-section" />, [state.types, types]);
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
        className="anime-create__form-section"
        dispatch={dispatch}
    />, [amount, hasMore, loading, page, searchPhrase, seasons, state.seasons, types]);
    const soundtracksFormPartComponent = useMemo(() => <SoundtracksFormPart dispatch={dispatch} maxCount={5} className="anime-create__form-section" />, []);
    const soundtracksPreviewComponent = useMemo(() => <SoundtracksPreviewFormPart dispatch={dispatch} sizeLimit={5242880} preview={state.soundtracksPreview} className="anime-create__form-section" />, [state.soundtracksPreview]);
    const imagesFormPartComponent = useMemo(() => <AnimeCreateImagesFormPart dispatch={dispatch} className="anime-create__form-section" />, []);
    const imagesPreviewComponent = useMemo(() => <AnimeCreateImagesPreviewFormPart dispatch={dispatch} sizeLimit={524288} preview={state.animeImagesPreview} className="anime-create__form-section" />, [state.animeImagesPreview]);

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
                <SubmitButton errors={errors.length} value="Dodaj nowe anime" className="anime-create__submit" />
            </form> : <Loading />}
        </main>
    );
};