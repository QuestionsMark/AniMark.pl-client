import { Link } from "react-router-dom";

import logo from '../../images/logo.jpg';

export const Logo = () => {
    return (
        <Link to="/" className="logo">
            <div className="logo__img-wrapper">
                <img src={logo} alt="logo" className="img" />
            </div>
            <h1 className="logo__title"><span className="logo__titleColor1">Ani</span><span className="logo__titleColor2">Mark</span><span className="logo__titleColor3">.pl</span></h1>
        </Link>
    );
};