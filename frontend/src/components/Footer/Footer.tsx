import "./Footer.css";
import logo from "../../assets/logo-header.svg";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdAccessTimeFilled } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top-line" />

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Fresh Auto" className="logo-img" />
            </Link>

            <p>
              <FaMapMarkerAlt />
              {t("footer.address")}
            </p>

            <p>
              <MdAccessTimeFilled />
              {t("footer.hours")}
            </p>

            <p>
              <IoMdMail />
              <a
                href="mailto:contact@freshauto.md"
                className="footer-brand-contacts"
              >
                contact@freshauto.md
              </a>
            </p>
          </div>

          <div className="footer-nav-links">
            <div className="footer-column">
              <Link to="/catalog">{t("nav.catalog")}</Link>
              <Link to="/promotii">{t("nav.promotions")}</Link>
              <Link to="/trade-in">{t("nav.tradeIn")}</Link>
            </div>

            <div className="footer-column">
              <Link to="/leasing">{t("nav.credit")}</Link>
              <Link to="/contact">{t("nav.contacts")}</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom-line" />

        <div className="footer-bottom">
          <p>{t("footer.rights")}</p>

          <div className="footer-social-icons">
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
      </div>
    </footer>
  );
}
