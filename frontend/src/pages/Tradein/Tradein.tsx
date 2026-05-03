import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Tradein.css";
import Footer from "../../components/Footer/Footer";
import { IoCarSportSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
function Tradein() {
  useEffect(() => {
    document.title = "Trade-in | Fresh-Auto";
  }, []);

  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        const cars = Array.isArray(data) ? data : data.cars || [];
        setOffers(cars.slice(0, 5));
      })
      .catch((err) => console.error("Eroare la oferte:", err));
  }, []);

  return (
    <>
      <Header />
      <main className="trade-page">
        <section className="trade-hero">
          <div className="main-container">
            <div className="trade-overlay"></div>

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
            <h2>De ce să alegi Trade-In?</h2>
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
                <h2>Formular Trade-In</h2>
                <form className="trade-form">
                  <input type="text" placeholder="Nume și prenume" />
                  <input type="tel" placeholder="Număr de telefon" />

                  <div className="form-row">
                    <input type="text" placeholder="Marca mașinii" />
                    <input type="text" placeholder="Model" />
                  </div>

                  <div className="form-row">
                    <input type="number" placeholder="An fabricație" />
                    <input type="number" placeholder="Kilometraj" />
                  </div>

                  <textarea placeholder="Descrie starea mașinii"></textarea>

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
                        {offer.year}, {offer.mileage.toLocaleString("ro-RO")}{" "}
                        km, {offer.fuel}, {offer.transmission}
                      </p>
                    </div>

                    <span>{offer.price.toLocaleString("ro-RO")}€</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Tradein;

/* <section className="trade-form-section" id="trade-form">
          <h2>Solicită evaluare Trade-In</h2>

          <form className="trade-form">
            <input type="text" placeholder="Nume și prenume" />
            <input type="tel" placeholder="Număr de telefon" />

            <div className="form-row">
              <input type="text" placeholder="Marca mașinii" />
              <input type="text" placeholder="Model" />
            </div>

            <div className="form-row">
              <input type="number" placeholder="An fabricație" />
              <input type="number" placeholder="Kilometraj" />
            </div>

            <textarea placeholder="Descrie starea mașinii"></textarea>

            <button type="submit">Trimite cererea</button>
          </form>
        </section> */
