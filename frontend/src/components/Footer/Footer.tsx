import "./Footer.css";
import logo from "../../assets/logo-header.svg";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdAccessTimeFilled } from "react-icons/md";
import "./Footer.css";

export default function Footer() {
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
              Mun. Chișinău, str. Pietrariei, 3
            </p>

            <p>
              <MdAccessTimeFilled />
              Ore: 8:00 - 17:00, Lun - Dum
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

          <div className="footer-column">
            <Link to="/catalog">Catalog Auto</Link>
            <Link to="/trade-in">Schimb Trade-in</Link>
          </div>

          <div className="footer-column">
            <Link to="/leasing">Credit Auto</Link>
            <Link to="/contacts">Contacte</Link>
          </div>
        </div>

        <div className="footer-bottom-line" />

        <div className="footer-bottom">
          <p>© 2026 Fresh-Auto. Toate drepturile rezervate.</p>

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
