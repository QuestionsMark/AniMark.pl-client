import { Dispatch, SetStateAction } from "react";
import { Collection, CommentPopulate } from "../../types";
import { AddComment } from "./AddComment";
import { CommentElement } from "./CommentElement";

interface Props {
    comments: CommentPopulate[];
    collection: Collection;
    collectionId: string;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const Comments = ({ collection, comments, collectionId, setRefresh }: Props) => {

    const commentsList = () => {
        return [...comments]
            .reverse()
            .map(c => <CommentElement key={c.id} comment={c} collectionId={collectionId} setRefresh={setRefresh} collection={collection} />);
    };

    return (
        <div className="main__subsection comment">
            <AddComment setRefresh={setRefresh} collectionId={collectionId} collection={collection} />
            <ul className="comment__list">
                {commentsList()}
            </ul>
        </div>
    );
};