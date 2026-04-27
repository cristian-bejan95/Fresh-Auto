import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo-header.svg";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { LuSunMedium } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";

export default function Header() {
  const [lang, setLang] = useState<"ro" | "ru">("ro");
  const [themeActive, setThemeActive] = useState(false);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-left">
          <a href="tel:+37360000000" className="phone-top">
            <FaPhoneAlt className="phone-icon-top" />
            <span>+373 60 000 000</span>
          </a>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="header-top-right">
          <div className="lang-toggle">
            <button
              type="button"
              className={lang === "ro" ? "active" : ""}
              onClick={() => setLang("ro")}
            >
              RO
            </button>

            <button
              type="button"
              className={lang === "ru" ? "active" : ""}
              onClick={() => setLang("ru")}
            >
              RU
            </button>
          </div>
          <Link to="/favorite" className="favorite-link">
            <GrFavorite className="favorit" />
          </Link>
          <button
            type="button"
            className={`theme-btn ${themeActive ? "active" : ""}`}
            onClick={() => setThemeActive((prev) => !prev)}
          >
            <LuSunMedium />
          </button>
        </div>
      </div>

      <div className="header-main">
        <Link to="/" className="logo">
          <img src={logo} alt="Fresh Auto" className="logo-img" />
        </Link>

        <nav className="nav-menu">
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/trade-in">Schimb trade-in</NavLink>
          <NavLink to="/leasing">Credit Auto</NavLink>
          <NavLink to="/contacts">Contacte</NavLink>
        </nav>

        <div className="search-box">
          <a href="tel:+3736000000" className="call-btn full">
            <FiPhone />
            <span>Sună acum</span>
          </a>
        </div>
      </div>
    </header>
  );
}
