import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { HOST_ADDRESS } from "../../../config";
import { useData } from "../../../hooks/useData";
import { UserInfoAPI } from "../../../types";

import defaultAvatar from "../../../images/guest.png";

interface Props {
    userId: string;
}

export const WhatsTheMelodyWinnerElement = ({ userId }: Props) => {

    const componentRef = useRef(null);

    const { data } = useData<UserInfoAPI>(`users/${userId}/info`, componentRef);

    const [user, setUser] = useState({ username: '', avatar: '' });

    useEffect(() => {
        if (!data) return;
        setUser({ avatar: data.avatar, username: data.username });
        
    }, [data]);

    return (
        <Popup
            ref={componentRef}
            trigger={
                <div className="whats-the-melody__circle" style={{ backgroundImage: user.avatar ? `url('${HOST_ADDRESS}/media/${user.avatar}')` : `url('${defaultAvatar}')` }} />
            }
            on="hover"
            position="top center"
            className="normal-popup"
        >
            {user.username}
        </Popup>
    );
};