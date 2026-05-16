import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import "./Header.css";
import "../../index.css";
import logo from "../../assets/logo-header.svg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState<"ro" | "ru">(
    (localStorage.getItem("lang") as "ro" | "ru") || "ro",
  );
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const loadFavoritesCount = () => {
      const favoriteIds: string[] = JSON.parse(
        localStorage.getItem("favorites") || "[]",
      );

      setFavoritesCount(favoriteIds.length);
    };

    loadFavoritesCount();

    window.addEventListener("favoritesUpdated", loadFavoritesCount);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavoritesCount);
    };
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setShowHeader(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.45;
      setShowHeader(window.scrollY > heroHeight);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const changeLang = (value: "ro" | "ru") => {
    setLang(value);
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value);
  };

  return (
    <header
      className={`header ${
        isHomePage ? (showHeader ? "show" : "") : "default-header"
      }`}
    >
      <div className="header-container">
        <div className="header-main">
          <Link to="/" className="logo">
            <img src={logo} alt="Fresh Auto" className="logo-img" />
          </Link>

          <nav className="nav-menu">
            <NavLink to="/catalog">{t("nav.catalog")}</NavLink>
            <NavLink to="/promotii">{t("nav.promotions")}</NavLink>
            <NavLink to="/trade-in">{t("nav.tradeIn")}</NavLink>
            <NavLink to="/leasing">{t("nav.credit")}</NavLink>
            <NavLink to="/contact">{t("nav.contacts")}</NavLink>
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
            <Link to="/favorite" className="header-favorite-btn">
              <GrFavorite className="header-favorite-img" />
              {favoritesCount > 0 && (
                <span className="favorite-count">{favoritesCount}</span>
              )}
            </Link>
            <div className="lang-toggle">
              <button
                type="button"
                className={lang === "ro" ? "active" : ""}
                onClick={() => changeLang("ro")}
              >
                RO
              </button>

              <button
                type="button"
                className={lang === "ru" ? "active" : ""}
                onClick={() => changeLang("ru")}
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
