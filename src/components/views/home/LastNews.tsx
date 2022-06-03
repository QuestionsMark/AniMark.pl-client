import { Link } from "react-router-dom";
import { NewsAPICondensed } from "../../../types";
import { ButtonPlus } from "../../common/ButtonPlus";
import { NewsElement } from "../news/NewsElement";

interface Props {
    lastNews: NewsAPICondensed[];
}

export const LastNews = ({ lastNews }: Props) => {

    const newsList = () => {
        return lastNews.map(n => <NewsElement key={n._id} news={n} />);
    };

    return (
        <section className="main__section last-news">
            <h2 className="last-news__title">Wiadomości ze Świata Anime!</h2>
            <div className="last-news__container">
                {newsList()}
            </div>
            <Link to="/news"><ButtonPlus className="last-news__btn">Zobacz wcześniejsze</ButtonPlus></Link>
        </section>
    );
};