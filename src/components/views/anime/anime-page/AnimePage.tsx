import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../../../contexts/userContext";
import { useData } from "../../../../hooks/useData";
import { AnimePageAPI } from "../../../../types";
import { Comments } from "../../../common/Comments";
import { IconButton } from "../../../common/IconButton";
import { Loading } from "../../../common/Loading";
import { AnimeBaner } from "./AnimeBaner";
import { AnimeDescription } from "./AnimeDescription";
import { AnimeGalery } from "./AnimeGalery";
import { AnimeSeasons } from "./AnimeSeasons";
import { AnimeSoundtracks } from "./AnimeSoundtracks";
import { AnimeTypes } from "./AnimeTypes";
import { UserRate } from "./UserRate";

export const AnimePage = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { user } = useUser();
    const { animeId } = useParams();

    const { data, setRefresh } = useData<AnimePageAPI>(`anime/${animeId}`, componentRef, [animeId], true);

    return (
        <main ref={componentRef} className="main__content anime-page">
            {data ?
                <>
                    <header className="anime-page__header">
                        {user.userId && [1, 2].includes(user.rank) && <Link to="edit" className="anime-page__edit-link"><IconButton handler={() => { }} icon={faGear} className="special" /></Link>}
                        <AnimeBaner
                            averageRate={data.averageRate}
                            image={data.images.baner}
                            info={data.info}
                            likes={data.likes.length}
                            title={data.title}
                            types={data.types}
                            watchLink={data.watchLink}
                        />
                        <UserRate animeId={data._id} userRate={data.rate.find(r => r.user === user.userId)?.rate} setRefresh={setRefresh} />
                    </header>
                    <section className="anime-page__content">
                        <AnimeTypes types={data.types} />
                        <AnimeDescription description={data.description} />
                        <AnimeGalery galery={data.images.galeryImages} />
                        {data.soundtracks.length > 0 && <AnimeSoundtracks setRefresh={setRefresh} soundtracks={data.soundtracks} />}
                        {data.seasons.length > 0 && <AnimeSeasons seasons={data.seasons} />}
                        <Comments collection="ANIME" collectionId={animeId as string} comments={data.comments} setRefresh={setRefresh} />
                    </section>
                </>
                : <Loading />}
        </main>
    );
};