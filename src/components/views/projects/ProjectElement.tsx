import { format } from "date-fns";
import { ProjectAPI } from "../../../types";
import { textHelper } from "../../../utils/textHelper";
import { Image } from "../../common/Image";
import { ProjectOtherLinkElement } from "./ProjectOtherLinkElement";
import { TechnologyElement } from "./TechnologyElement";

interface Props {
    project: ProjectAPI;
    observer?: (node: any) => void;
}

export const ProjectElement = ({ project, observer }: Props) => {

    const { createdAt, description, imgSrc, name, links, otherLinks, technologies } = project;

    const technologiesList = () => {
        return technologies.map(t => <TechnologyElement key={t} technology={t} />);
    };

    const otherLinksList = () => {
        return [...links.map(l => ({ ...l, isStatic: true })), ...otherLinks].map((l, i) => <ProjectOtherLinkElement key={String(i)} link={l} />);
    };

    return (
        <li ref={observer || null} className="main__subsection projects__item">
            <div className="projects__content">
                <div className="projects__img-wrapper">
                    <Image alt="Projekt" src={imgSrc} />
                </div>
                <div className="projects__informations">
                    <h3 className="projects__title">{name}</h3>
                    <div className="text text--indent projects__description">
                        {textHelper(description)}
                    </div>
                </div>
            </div>
            {technologies.length > 0 && <ul className="projects__technologies-list">
                {technologiesList()}
            </ul>}
            {otherLinks.length + links.length > 0 && <ul className="projects__other-links-list">
                {otherLinksList()}
            </ul>}
            <time className="projects__date">{format(new Date(createdAt), 'd.M.yyy')}</time>
        </li>
    );
};