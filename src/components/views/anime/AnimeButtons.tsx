import { AnimeStatus, AnimeStatusButton } from "./AnimeStatusButton";

import { useUser } from "../../../contexts/userContext";

interface Props {
    animeId: string;
}

export const AnimeButtons = ({ animeId }: Props) => {
    const { user } = useUser();

    const checkActive = (status: AnimeStatus): boolean => {
        if (user.data) {
            switch (status) {
                case 'FAVORITE':
                    return user.data.favoriteAnime.findIndex(a => a.anime === animeId) !== -1;
                case 'PLANNED':
                    return user.data.userAnimeData.planned.findIndex(a => a === animeId) !== -1;
                case 'PROCESS_OF_WATCHING':
                    return user.data.userAnimeData.processOfWatching.findIndex(a => a === animeId) !== -1;
                case 'STOPPED':
                    return user.data.userAnimeData.stopped.findIndex(a => a === animeId) !== -1;
                case 'WATCHED':
                    return user.data.userAnimeData.watched.findIndex(a => a.anime === animeId) !== -1;
            }
        }
        return false;
    };

    return (
        <div className="anime__status">
            <AnimeStatusButton active={checkActive('PLANNED')} animeId={animeId} status="PLANNED" text="Planowane" />
            <AnimeStatusButton active={checkActive('PROCESS_OF_WATCHING')} animeId={animeId} status="PROCESS_OF_WATCHING" text="W trakcie oglądania" />
            <AnimeStatusButton active={checkActive('STOPPED')} animeId={animeId} status="STOPPED" text="Wstrzymane" />
            <AnimeStatusButton active={checkActive('WATCHED')} animeId={animeId} status="WATCHED" text="Obejrzane" />
            <AnimeStatusButton active={checkActive('FAVORITE')} animeId={animeId} status="FAVORITE" text="Ulubione" />
        </div>
    );
};