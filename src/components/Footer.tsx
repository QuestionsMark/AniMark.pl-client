import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__section">
                <div className="footer__part footer__socials">
                    <h2 className="footer__title">Social Media</h2>
                    <div className="footer__links-wrapper">
                        <a href="https://www.facebook.com/profile.php?id=100002385831117" target="_blank" rel="noreferrer" className="footer__link"><FontAwesomeIcon icon={faFacebook} className="footer__icon" />Facebook</a>
                        <a href="https://www.facebook.com/profile.php?id=100002385831117" target="_blank" rel="noreferrer" className="footer__link"><FontAwesomeIcon icon={faFacebook} className="footer__icon" />Facebook</a>
                    </div>
                </div>
                <div className="footer__part footer__links">
                    <h2 className="footer__title">Linki</h2>
                    <div className="footer__links-wrapper">
                        <p className="footer__link-wrapper"><Link to="/" className="link footer__link--small">strona główna</Link></p>
                        <p className="footer__link-wrapper"><Link to="/anime" className="link footer__link--small">anime</Link></p>
                        <p className="footer__link-wrapper"><Link to="/users" className="link footer__link--small">użytkownicy</Link></p>
                        <p className="footer__link-wrapper"><Link to="/types" className="link footer__link--small">gatunki</Link></p>
                        <p className="footer__link-wrapper"><Link to="/galery" className="link footer__link--small">galeria</Link></p>
                        <p className="footer__link-wrapper"><Link to="/rules" className="link footer__link--small">regulamin</Link></p>
                        <p className="footer__link-wrapper"><Link to="/source" className="link footer__link--small">źródła</Link></p>
                        <p className="footer__link-wrapper"><Link to="/achievements" className="link footer__link--small">osiągnięcia</Link></p>
                        <p className="footer__link-wrapper"><Link to="/my-another-projects" className="link footer__link--small">projekty</Link></p>
                    </div>
                </div>
                <div className="footer__part footer__additions">
                    <h2 className="footer__title">Dodadki/Nowinki</h2>
                    <div className="footer__links-wrapper">
                        <p className="footer__link-wrapper"><Link to="/project-ideas" className="link footer__link--small">pomysły projektów</Link></p>
                        <p className="footer__link-wrapper"><Link to="/whats-the-melody" className="link footer__link--small">jaka to melodia</Link></p>
                    </div>
                </div>
            </div>
            <div className="footer__section footer__licence">
                <p className="footer__text">Wszelkie prawa absolutnie nie są zastrzeżone! &copy; Nie umiem tak pięknie rysować KEKW</p>
            </div>
        </footer>
    );
};