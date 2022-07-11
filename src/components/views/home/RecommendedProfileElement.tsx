import { faHeart, faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { HOST_ADDRESS } from "../../../config";
import { RecommendedProfileAPI } from "../../../types";
import { Image } from "../../common/Image";

interface Props {
    profile: RecommendedProfileAPI;
}

export const RecommendedProfileElement = ({ profile }: Props) => {

    const { _id, avatar, background, likes, sumOfPoints, username } = profile;

    return (
        <Link to={`/users/${_id}`} className="recommended-profiles__profile" style={{ backgroundImage: `url('${HOST_ADDRESS}/media/${background}')` }}>
            <div className="recommended-profiles__curtain" />
            <div className="recommended-profiles__statistics">
                <FontAwesomeIcon icon={faMedal} className="recommended-profiles__icon special" />
                <p className="recommended-profiles__value">{sumOfPoints}</p>
            </div>
            <div className="recommended-profiles__img-wrapper">
                <Image alt="Avatar" src={avatar} />
            </div>
            <div className="recommended-profiles__statistics">
                <FontAwesomeIcon icon={faHeart} className="recommended-profiles__icon color" />
                <p className="recommended-profiles__value">{likes.length}</p>
            </div>
            <p className="recommended-profiles__username">{username}</p>
        </Link>
    );
};