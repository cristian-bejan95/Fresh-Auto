import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tradein.css";
import tradeImg from "../../assets/trade-in.png";
import { IoCarSportSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";

export default function Tradein() {
  useEffect(() => {
    document.title = "Trade-in | Fresh-Auto";
  }, []);

  const [imagesCount, setImagesCount] = useState(0);
  const [offers, setOffers] = useState<any[]>([]);
  const [phone, setPhone] = useState("+373 ");
  const [phoneError, setPhoneError] = useState("");

  const formatMDPhone = (value: string) => {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("373")) {
      digits = digits.slice(3);
    }

    digits = digits.slice(0, 8);

    let formatted = "+373 ";

    if (digits.length > 0) formatted += digits.slice(0, 2);
    if (digits.length > 2) formatted += " " + digits.slice(2, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 8);

    return formatted;
  };

  const validateMDPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 3) return "";
    if (digits.length !== 11) return "";

    const mdNumber = digits.slice(3);

    if (!/^[267]\d{7}$/.test(mdNumber)) {
      return "Număr invalid (trebuie să înceapă cu 6 sau 7)";
    }

    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMDPhone(e.target.value);
    setPhone(formatted);
    setPhoneError(validateMDPhone(formatted));
  };

  const handlePhoneBlur = () => {
    setPhoneError(validateMDPhone(phone));
  };

  const handlePhoneFocus = () => {
    if (!phone.trim()) setPhone("+373 ");
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        const cars = Array.isArray(data) ? data : data.cars || [];
        setOffers(cars.slice(0, 6));
      })
      .catch((err) => console.error("Eroare la oferte:", err));
  }, []);

  return (
    <>
      <section className="trade-page">
        <div className="main-container">
          <div className="tradein-breadcrumb-row">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Pagina principală
              </Link>

              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>

              <span className="breadcrumb-current">Trade-in</span>
            </nav>
          </div>
          <div className="trade-overlay"></div>

          <div className="tradein-hero-wrapper">
            <div className="trade-content">
              <h1>
                Schimbă mașina ta prin programul Trade-In rapid și avantajos
              </h1>

              <p>
                Adu automobilul tău actual, primește o evaluare corectă și alege
                o mașină nouă din stocul Fresh Auto. Simplu, rapid și fără
                stres.
              </p>

              <div className="trade-actions">
                <a href="#trade-form" className="trade-btn primary">
                  Cere evaluare
                </a>
              </div>
            </div>
            <div className="trade-page-image">
              <img src={tradeImg} alt="Trade in auto" />
            </div>
          </div>
          <div className="trade-steps">
            <h2>Pașii</h2>

            <div className="steps-wrapper">
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-icon">
                    <IoCarSportSharp />
                    <span className="step-number">1</span>
                  </div>
                  <h3>Vino cu mașina ta</h3>
                  <p>Aduci mașina ta pentru o evaluare rapidă.</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">
                    <FaTags />
                    <span className="step-number">2</span>
                  </div>
                  <h3>Primești oferta</h3>
                  <p>Noi analizăm mașina și îți oferim o evaluare corectă.</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">
                    <FaUserCheck />
                    <span className="step-number">3</span>
                  </div>
                  <h3>Alegi mașina nouă</h3>
                  <p>Selectezi automobilul dorit din stocul Fresh Auto.</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">
                    <FaHandHoldingUsd />
                    <span className="step-number">4</span>
                  </div>
                  <h3>Facem schimbul</h3>
                  <p>Achită doar diferența și pleci cu noua mașină.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trade-benefits">
        <div className="main-container">
          <h2>De ce să alegi Trade-In la Fresh Auto</h2>
          <p>
            Nu mai pierzi timp cu anunțuri, apeluri și negocieri. Noi preluăm
            procesul și îți oferim o soluție comodă.
          </p>
          <div className="trade-benefits-wrapper">
            <div className="benefit-trade">
              <div className="benefit-left">
                <ul>
                  <li>Evaluare rapidă și transparentă</li>
                  <li>Posibilitate de finanțare</li>
                  <li>Schimb în aceeași zi</li>
                  <li>Fără stres și fără pierdere de timp</li>
                </ul>
              </div>

              <div className="benefit-right">
                <h3>Primește ofertă rapidă</h3>
                <p>
                  Lasă datele mașinii tale și echipa noastră te contactează
                  pentru evaluare.
                </p>
                <a href="#trade-form">Completează formularul</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="formular-tradein" id="trade-form">
        <div className="main-container">
          <div className="tradein-wrapper">
            <div className="tradein-box">
              <div className="tradein-form-title">
                <h2>Formular Trade-In</h2>
                <p>
                  Introdu datele mașinii tale și atașează poze sau indică
                  link-ul de pe 999.md sau alte platforme de vînzări.
                </p>
              </div>
              <form className="trade-form">
                <div className="trade-form-grid">
                  <div className="trade-field">
                    <label>Link anunț vînzare (999.md, etc.)</label>
                    <input type="text" />
                  </div>

                  <div className="trade-field">
                    <label>Imagine</label>

                    <div className="file-upload-box">
                      <label className="file-btn">
                        Alege fișierele
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            setImagesCount(files ? files.length : 0);
                          }}
                        />
                      </label>

                      <span className="file-name">
                        {imagesCount > 0
                          ? `${imagesCount} ${imagesCount === 1 ? "imagine selectată" : "imagini selectate"}`
                          : "Nu ai ales niciun fișier"}
                      </span>
                    </div>
                  </div>

                  <div className="trade-field">
                    <label>Mașina dorită din parcul Fresh Auto (link)</label>
                    <input type="text" />
                  </div>

                  <div className="trade-field">
                    <label>Diferența de preț propusă</label>
                    <input type="text" />
                  </div>
                </div>

                <div className="trade-field trade-field-full">
                  <label>
                    Marcă, model, an, parcurs km, tip combustibil, tip cutie de
                    viteze, preț dorit și alte detalii
                  </label>
                  <textarea placeholder="Introdu datele..." />
                </div>

                <h3>Date de contact</h3>

                <div className="trade-form-grid">
                  <div className="trade-field">
                    <label>Nume</label>
                    <input type="text" />
                  </div>

                  <div className="trade-field">
                    <label>Număr telefon de contact</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      onFocus={handlePhoneFocus}
                      inputMode="numeric"
                      placeholder="+373 69 123 456"
                      className={phoneError ? "input-error" : ""}
                    />

                    {phoneError && (
                      <span className="trade-error">{phoneError}</span>
                    )}
                  </div>
                </div>

                <button type="submit">
                  <LiaTelegramPlane style={{ marginRight: 8 }} />
                  Trimite cererea
                </button>
              </form>
            </div>
            <div className="offers-box">
              <h3>Oferte interesante</h3>

              <div className="offer-line" />

              {offers.map((offer) => (
                <Link
                  to={`/cars/${offer._id}`}
                  key={offer._id}
                  className="offer-item"
                >
                  <img
                    src={offer.images?.[0] || "/placeholder-car.jpg"}
                    alt={offer.title}
                  />

                  <div>
                    <strong>{offer.title}</strong>
                    <p>
                      {offer.year}, {offer.mileage.toLocaleString("ro-RO")} km,{" "}
                      {offer.fuel}, {offer.transmission}
                    </p>
                  </div>

                  <span>{offer.price.toLocaleString("ro-RO")}€</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
