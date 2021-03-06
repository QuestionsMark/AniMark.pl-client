import { Link } from "react-router-dom";

interface Props {
    link: {
        src: string;
        note: string;
        isStatic?: boolean;
    };
}

export const ProjectOtherLinkElement = ({ link }: Props) => {

    const { isStatic, note, src } = link;

    return (
        <li className="projects__other-links-item">
            {isStatic ? <Link to={src} id="btn" className="link btn projects__other-links-link">{note}</Link> : <a href={src} target="_blank" rel="noreferrer" id="btn" className="link btn projects__other-links-link">{note}</a>}
        </li>
    );
};