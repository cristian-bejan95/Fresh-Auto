import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";
import "./Header.css";
import "../../index.css";
import logo from "../../assets/logo-header.svg";

export default function Header() {
  const [lang, setLang] = useState<"ro" | "ru">("ro");
  const [themeActive, setThemeActive] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
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
          </div>
        </div>
      </div>
    </header>
  );
}
