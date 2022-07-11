import { useRef } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { ProjectAPI } from "../../../types";
import { ProjectElement } from "../projects/ProjectElement";

export const MyProjects = () => {

    const componentRef = useRef(null);

    const { data } = useData<ProjectAPI[]>('projects/last', componentRef);

    const projectsList = () => {
        if (!data) return null;
        return data.map(p => <ProjectElement key={p._id} project={p} />);
    };

    return (
        <section ref={componentRef} className="main__section projects__last">
            <h2 className="main__title">Moje projekty</h2>
            <ul className="projects__list projects__last-list">
                {projectsList()}
            </ul>
            <Link to="/projects" id="btn-center" className="btn recommended-profiles__moreLink">Inne moje projekty</Link>
        </section>
    );
};