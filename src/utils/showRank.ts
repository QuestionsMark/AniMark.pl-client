import { RoleEnum } from "../types";

export const showRank = (rank: RoleEnum) => {
    switch (rank) {
        case 0:
            return 'Użytkownik';
        case 1:
            return 'Moderator';
        case 2:
            return 'Admin';
    }
}