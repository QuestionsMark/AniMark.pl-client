interface Props {
    src: string;
}

export const NewsVideoElement = ({ src }: Props) => {
    return (
        <li className="news-page__videos-item">
            <iframe className="news-page__videos-iframe" src={src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
        </li>
    );
};