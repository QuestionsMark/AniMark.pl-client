import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export const ShowRightSide = () => {

    const rightSideRef = useRef<Element | null>(null);

    const [hidden, setHidden] = useState(true);

    const handleClick = () => {
        if (!rightSideRef.current) return;
        setHidden(state => !state);
        if (hidden) {
            rightSideRef.current.classList.add('active');
        } else {
            rightSideRef.current.classList.remove('active');
        }
    };

    useEffect(() => {
        rightSideRef.current = document.querySelector('.right-side');
    }, []);

    return (
        <div className="main__show-right-side" onClick={handleClick}>
            <FontAwesomeIcon icon={hidden ? faCaretLeft : faCaretRight} className="main__show-right-side-icon" />
        </div>
    );
};