import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import "./Contacts.css";

export default function Contacts() {
  useEffect(() => {
    document.title = "Contacte | Fresh-Auto";
  }, []);

  return (
    <>
      <section className="contacts-page" data-aos="fade-down">
        <div className="main-container">
          <div className="contacts-breadcrumb-row">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Pagina principală
              </Link>

              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>

              <span className="breadcrumb-current">Contact</span>
            </nav>
          </div>
          <div className="contacts-header">
            <h1>Contacte</h1>
            <p>Lasați-ne un mesaj și revenim în cel mai scurt timp</p>
          </div>
          <div className="contacts-section">
            <div className="contacts-container contacts-grid">
              <div className="contacts-info">
                <h2>Datele noastre</h2>

                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Adresă</strong>
                    <span>Mun. Chișinău, str. Pietrăriei 3</span>
                  </div>
                </div>

                <div className="contact-item">
                  <FaPhoneAlt />
                  <div>
                    <strong>Telefon</strong>
                    <a href="tel:+37360000000">+373 60 000 000</a>
                  </div>
                </div>

                <div className="contact-item">
                  <FaEnvelope />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:contact@freshauto.md">
                      contact@freshauto.md
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <FaClock />
                  <div>
                    <strong>Program</strong>
                    <span>Lun - Dum: 08:00 - 17:00</span>
                  </div>
                </div>

                <div className="contacts-socials">
                  <h3>Rețele sociale</h3>

                  <div className="contacts-socials-grid">
                    <a href="#" target="_blank">
                      <FaFacebookF />
                    </a>

                    <a href="#" target="_blank">
                      <FaTiktok />
                    </a>

                    <a href="#" target="_blank">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>

              <form className="contacts-form">
                <h2>Trimite un mesaj</h2>

                <input type="text" placeholder="Nume dmv." />
                <input
                  type="tel"
                  placeholder="+37360000000"
                  maxLength={11}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;

                    target.value = target.value.replace(/\D/g, "");
                  }}
                />
                <input type="email" placeholder="Email" />
                <textarea placeholder="Mesajul tău..." />

                <button type="submit">
                  <LiaTelegramPlane style={{ marginRight: 8 }} />
                  Trimite mesajul
                </button>
              </form>
            </div>
          </div>
          <div className="contacts-map-section" data-aos="fade-up">
            <div className="contacts-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43494.7867983281!2d28.781258622362138!3d47.05152899006127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbd630210f6669%3A0xffd3ce64404fcb60!2zU3RyYWRhIFBpZXRyxINyaWVpIDMsIE1ELTIwMDUsIENoaciZaW7Eg3UsIE1vbGRvdmE!5e0!3m2!1sro!2s!4v1777747265218!5m2!1sro!2s"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
