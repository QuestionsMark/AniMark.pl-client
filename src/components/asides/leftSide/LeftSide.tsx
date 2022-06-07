import { useScrollUp } from "../../../hooks/useScrollUp";

export const LeftSide = () => {

    const { scrollUp } = useScrollUp();

    return (
        <aside className="main__left-side">
            <div className="left-nav" onClick={scrollUp}>Wróć do góry</div>
        </aside>
    );
};