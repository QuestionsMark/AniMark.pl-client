import { WTMVotes } from "../types";

export const didUserVote = (votes: WTMVotes[] | null, id: string | null): boolean => {
    if (votes && id) {
        const allVotes = votes.reduce((p, a) => [...p, ...a.votes], [] as string[]);
        return allVotes.findIndex(v => v === id) !== -1;
    }
    return true;
}