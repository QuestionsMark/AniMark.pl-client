import { Link } from "react-router-dom";
import { useHome } from "../../../contexts/homeContext";
import { NewsElement } from "../news/NewsElement";

export const LastNews = () => {

    const { lastNews } = useHome();

    const newsList = () => {
        if (!lastNews) return;
        return lastNews.map(n => <NewsElement key={n._id} news={n} />);
    };

    return (
        <section className="main__section last-news">
            <h2 className="main__title">Wiadomości ze Świata Anime!</h2>
            <div className="last-news__articles">
                {newsList()}
            </div>
            <Link to="/news" id="btn-center" className="btn last-news__link">Zobacz wcześniejsze</Link>
        </section>
    );
};