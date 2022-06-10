import { Link } from "react-router-dom";
import { useHome } from "../../../contexts/homeContext";
import { RecommendedProfileElement } from "./RecommendedProfileElement";

export const RecommendedProfiles = () => {

    const { recommendedProfiles } = useHome();

    const profilesList = () => {
        if (!recommendedProfiles) return;
        return recommendedProfiles.map(p => <RecommendedProfileElement key={p._id} profile={p} />);
    };

    return (
        <section className="main__section recommended-profiles">
            <h2 className="main__title">Polecane Profile!</h2>
            <div className="recommended-profiles__profiles">
                {profilesList()}
            </div>
            <Link to="/users" id="btn-center" className="btn recommended-profiles__moreLink">Lista użyszkodników</Link>
        </section>
    );
};