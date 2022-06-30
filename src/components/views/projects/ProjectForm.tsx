import { Dispatch, FormEvent, SetStateAction, useMemo, useReducer } from "react";
import { usePopup } from "../../../contexts/popupContext";
import { useValidation } from "../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../reducers/formReducer";
import { ProjectCreateEntity } from "../../../types";
import { fetchWithFileUpload } from "../../../utils/fetchHelper";
import { CloseButton } from "../../common/CloseButton";
import { SubmitButton } from "../../common/SubmitButton";
import { DescriptionFormPart } from "../../formElements/DescriptionFormInput";
import { ImagesFormPart } from "../../formElements/ImagesFormPart";
import { ImagesPreviewFormPart } from "../../formElements/ImagesPreviewFormPart";
import { NameFormPart } from "../../formElements/NameFormPart";
import { OtherLinksFormPart } from "../../formElements/OtherLinksFormPart";
import { TechnologiesFormPart } from "../../formElements/TechnologiesFormPart";
import { ValidationFormPart } from "../../formElements/ValidationFormPart";

interface Props {
    close: () => void;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

const defaultProjectForm: ProjectCreateEntity = {
    description: '',
    images: null,
    links: [],
    name: '',
    otherLinks: [],
    preview: [],
    technologies: [],
};

export const ProjectForm = ({ close, setRefresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const [state, dispatch] = useReducer(formReducer, defaultProjectForm) as [ProjectCreateEntity, Dispatch<FormAction>];
    const { errors } = useValidation(state, 'PROJECT_CREATE');

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
        const { message, status } = await fetchWithFileUpload('projects', 'POST', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => !state);
        setResponsePopup({ message, open: true, status });
        close();
    };

    const nameFormInputComponent = useMemo(() => <NameFormPart dispatch={dispatch} value={state.name} className="projects__form-section" />, [state.name]);

    const DescriptionFormInputComponent = useMemo(() => <DescriptionFormPart dispatch={dispatch} value={state.description} className="projects__form-section" textareaClassName="projects__form-textarea" />, [state.description]);

    const linksFormPartComponent = useMemo(() => <OtherLinksFormPart dispatch={dispatch} value={state.links} className="projects__form-section" isStatic maxCount={10} title="Odnośniki statyczne*" />, [state.links]);

    const otherLinksFormPartComponent = useMemo(() => <OtherLinksFormPart dispatch={dispatch} value={state.otherLinks} className="projects__form-section" maxCount={10} title="Odnośniki*" />, [state.otherLinks]);

    const technologiesFormPartComponent = useMemo(() => <TechnologiesFormPart dispatch={dispatch} value={state.technologies} className="projects__form-section" />, [state.technologies]);

    const imagesPreviewFormPartComponent = useMemo(() => <ImagesPreviewFormPart dispatch={dispatch} preview={state.preview} sizeLimit={524288} className="projects__form-section" />, [state.preview]);

    return (
        <div className="projects__form-container">
            <CloseButton handler={close} className="projects__form-close-icon" />
            <h2 className="main__title projects__form-title">Nowy projekt</h2>
            <form className="form projects__form" onSubmit={handleSubmit}>
                {nameFormInputComponent}
                {DescriptionFormInputComponent}
                {linksFormPartComponent}
                {otherLinksFormPartComponent}
                {technologiesFormPartComponent}
                <ImagesFormPart dispatch={dispatch} className="projects__form-section" />
                {imagesPreviewFormPartComponent}
                <SubmitButton errors={errors.length} value="Dodaj projekt" className="projects__submit" />
                <ValidationFormPart errors={errors} />
            </form>
        </div>
    );
};