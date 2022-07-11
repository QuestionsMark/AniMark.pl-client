import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../../contexts/userContext";
import { useData } from "../../../../hooks/useData";
import { PrivacyAPI } from "../../../../types";
import { Loading } from "../../../common/Loading";
import { SmallNotFound } from "../../../common/SmallNotFound";
import { ProfilePrivacySettingsForm } from "./ProfilePrivacySettingsForm";

export const ProfilePrivacySettings = () => {

    const componentRef = useRef(null);

    const { user } = useUser();
    const { userId } = useParams();
    const { data, setRefresh } = useData<PrivacyAPI>(`users/${user.userId}/privacy`, componentRef);

    return (
        <div ref={componentRef} className="profile-privacy-settings">
            {user.userId && user.userId === userId ? data ? <ProfilePrivacySettingsForm privacyEditState={{ ...data, password: '', passwordAgain: '', passwordConfirm: '' }} setRefresh={setRefresh} /> : <Loading /> : <SmallNotFound />}
        </div>
    );
};