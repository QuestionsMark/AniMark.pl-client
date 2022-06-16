import { useEffect, useRef } from "react";
import { useRightSide } from "../../../contexts/rightSideContext";
import { getData } from "../../../utils/getData";
import { LoadingWithMargin } from "../../common/LoadingWithMargin";
import { AddSmallComment } from "./AddSmallComment";
import { SmallComment } from "./SmallComment";

export const WhatsTheMelodyComments = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { comments, setComments } = useRightSide();

    const commentList = () => {
        if (!comments) return;
        return comments.map(c => <SmallComment key={c.id} comment={c} />);
    };

    useEffect(() => {
        getData('whats-the-melody/actual/comments', setComments, componentRef);
    }, []);

    return (
        <section ref={componentRef} className="right-side__section recommended-anime whats-the-melody__comments">
            {comments ?
                <>
                    <h3 className="recommended-anime__title">Skomentuj wyniki!</h3>
                    <div className="recommended-anime__comments">
                        <ul className="recommended-anime__comments-list">
                            {commentList()}
                        </ul>
                        <AddSmallComment />
                    </div>
                </> :
                <LoadingWithMargin marginHorizontal={0} marginVertical={100} />}
        </section>
    );
};