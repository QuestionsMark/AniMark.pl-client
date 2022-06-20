import { Dispatch, SetStateAction, useReducer } from "react";
import { formReducer } from "../../../../reducers/formReducer";
import { ProfileAPI } from "../../../../types";

interface Props {
    profile: ProfileAPI;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const ProfileEdit = ({ profile, setRefresh }: Props) => {

    // const [state, dispatch] = useReducer(formReducer, profileEdit) as []

    return (
        <div className="profile-edit">

        </div>
    );
};