import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo-header.svg";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { LuSunMedium } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const [lang, setLang] = useState<"ro" | "ru">("ro");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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

        <div className="header-search">
          <div className="header-search-box">
            <input
              type="text"
              placeholder="Caută mașină"
              value={searchValue}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchOpen(true);
              }}
            />
            <CiSearch className="search-icon-loop" />
          </div>

          {searchOpen && (
            <div className="search-dropdown">
              <p>Nici o mașină găsită</p>
            </div>
          )}

          {searchOpen && (
            <div
              className="search-backdrop"
              onClick={() => setSearchOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
