import { useRef } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { ProfileAPI } from "../../../types";
import { Loading } from "../../common/Loading";
import { SmallNotFound } from "../../common/SmallNotFound";
import { ProfileAchievements } from "./profile-achievements/ProfileAchievements";
import { ProfileAnime } from "./profile-anime/ProfileAnime";
import { ProfileEdit } from "./profile-edit/ProfileEdit";
import { ProfileHome } from "./profile-home/ProfileHome";
import { ProfilePrivacySettings } from "./profile-privacy-settings/ProfilePrivacySettings";
import { ProfileNav } from "./ProfileNav";

export const Profile = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { userId } = useParams();
    const { data, setRefresh } = useData<ProfileAPI>(`users/${userId}`, componentRef, [userId], true);

    return (
        <main ref={componentRef} className="main__content profile">
            {data ? <>
                <ProfileNav userId={userId as string} />
                <Routes>
                    <Route path="/" element={<ProfileHome profile={data} setRefresh={setRefresh} />} />
                    <Route path="/anime" element={<ProfileAnime />} />
                    <Route path="/achievements" element={<ProfileAchievements />} />
                    <Route path="/edit" element={<ProfileEdit profile={data} setRefresh={setRefresh} />} />
                    <Route path="/privacy-settings" element={<ProfilePrivacySettings />} />
                    <Route path="*" element={<SmallNotFound />} />
                </Routes>
            </> : <Loading />}
        </main>
    );
};