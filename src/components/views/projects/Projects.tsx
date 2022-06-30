import { useMemo } from "react";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useOpen } from "../../../hooks/useOpen";
import { useSearch } from "../../../hooks/useSearch";
import { ProjectAPI } from "../../../types";
import { PROJECTS_LIMIT } from "../../../utils/dataLimit";
import { AddButton } from "../../common/AddButton";
import { FormPopup } from "../../common/FormPopup";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { ProjectElement } from "./ProjectElement";
import { ProjectForm } from "./ProjectForm";

export const Projects = () => {

    const { amount, data, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage, setRefresh } = useSearch<ProjectAPI>('projects', PROJECTS_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, PROJECTS_LIMIT, setPage);
    const { close, isOpen, open } = useOpen();

    const projectsList = () => {
        return data.map((p, i) => <ProjectElement key={p._id} project={p} observer={(i + 1) % PROJECTS_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    const projectsListComponent = useMemo(() => data.length > 0 && <ul className="projects__list">
        {projectsList()}
    </ul>, [data]);

    return (
        <main className="main__content projects">
            <FormPopup close={close} form={<ProjectForm close={close} setRefresh={setRefresh} />} isOpen={isOpen} trigger={<AddButton handler={open} className="news__add-icon" />} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="projects__search" />
            {projectsListComponent}
            {loading && <Loading />}
        </main>
    );
};