import { Introduction } from "../../../../types";
import { textHelper } from "../../../../utils/textHelper";

interface Props {
    introduction: Introduction;
}

export const ProfileIntroduction = ({ introduction }: Props) => {

    const { description, title } = introduction;

    return (
        <section className="main__subsection profile-home__introduction">
            <h2 className="profile__title">{title}</h2>
            <div className="profile-home__introduction-text text text--indent">{textHelper(description)}</div>
        </section>
    );
}