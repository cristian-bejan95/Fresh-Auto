import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Tradein.css";
import tradeImg from "../../assets/trade-in.png";

import { IoCarSportSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";

export default function Tradein() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = `${t("tradein.title")} | Fresh-Auto`;
  }, [t]);

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
      return t("tradein.invalidPhone");
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
      <section className="trade-page" data-aos="fade-down">
        <div className="main-container">
          <div className="tradein-breadcrumb-row">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("breadcrumb.home")}
              </Link>

              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>

              <span className="breadcrumb-current">
                {t("tradein.breadcrumb")}
              </span>
            </nav>
          </div>

          <div className="trade-overlay"></div>

          <div className="tradein-hero-wrapper">
            <div className="trade-content">
              <h1>{t("tradein.heroTitle")}</h1>

              <p>{t("tradein.heroText")}</p>

              <div className="trade-actions">
                <a href="#trade-form" className="trade-btn primary">
                  {t("tradein.requestEvaluation")}
                </a>
              </div>
            </div>

            <div className="trade-page-image">
              <img src={tradeImg} alt="Trade in auto" />
            </div>
          </div>

          <div className="trade-steps">
            <h2>{t("tradein.steps")}</h2>

            <div className="steps-wrapper">
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-icon">
                    <IoCarSportSharp />
                    <span className="step-number">1</span>
                  </div>

                  <h3>{t("tradein.step1Title")}</h3>

                  <p>{t("tradein.step1Text")}</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">
                    <FaTags />
                    <span className="step-number">2</span>
                  </div>

                  <h3>{t("tradein.step2Title")}</h3>

                  <p>{t("tradein.step2Text")}</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">
                    <FaUserCheck />
                    <span className="step-number">3</span>
                  </div>

                  <h3>{t("tradein.step3Title")}</h3>

                  <p>{t("tradein.step3Text")}</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">
                    <FaHandHoldingUsd />
                    <span className="step-number">4</span>
                  </div>

                  <h3>{t("tradein.step4Title")}</h3>

                  <p>{t("tradein.step4Text")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trade-benefits" data-aos="fade-down">
        <div className="main-container">
          <h2>{t("tradein.benefitsTitle")}</h2>

          <p>{t("tradein.benefitsText")}</p>

          <div className="trade-benefits-wrapper">
            <div className="benefit-trade">
              <div className="benefit-left">
                <ul>
                  <li>{t("tradein.benefit1")}</li>
                  <li>{t("tradein.benefit2")}</li>
                  <li>{t("tradein.benefit3")}</li>
                  <li>{t("tradein.benefit4")}</li>
                </ul>
              </div>

              <div className="benefit-right">
                <h3>{t("tradein.fastOffer")}</h3>

                <p>{t("tradein.fastOfferText")}</p>

                <a href="#trade-form">{t("tradein.completeForm")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="formular-tradein" id="trade-form" data-aos="fade-up">
        <div className="main-container">
          <div className="tradein-wrapper">
            <div className="tradein-box">
              <div className="tradein-form-title">
                <h2>{t("tradein.formTitle")}</h2>

                <p>{t("tradein.formSubtitle")}</p>
              </div>

              <form className="trade-form">
                <div className="trade-form-grid">
                  <div className="trade-field">
                    <label>{t("tradein.saleLink")}</label>

                    <input type="text" />
                  </div>

                  <div className="trade-field">
                    <label>{t("tradein.images")}</label>

                    <div className="file-upload-box">
                      <label className="file-btn">
                        {t("tradein.chooseFiles")}

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
                          ? `${imagesCount} ${
                              imagesCount === 1
                                ? t("tradein.selectedImage")
                                : t("tradein.selectedImages")
                            }`
                          : t("tradein.noFiles")}
                      </span>
                    </div>
                  </div>

                  <div className="trade-field">
                    <label>{t("tradein.desiredCar")}</label>

                    <input type="text" />
                  </div>

                  <div className="trade-field">
                    <label>{t("tradein.priceDifference")}</label>

                    <input type="text" />
                  </div>
                </div>

                <div className="trade-field trade-field-full">
                  <label>{t("tradein.carDetails")}</label>

                  <textarea placeholder={t("tradein.enterDetails")} />
                </div>

                <h3>{t("tradein.contactData")}</h3>

                <div className="trade-form-grid">
                  <div className="trade-field">
                    <label>{t("tradein.name")}</label>

                    <input type="text" />
                  </div>

                  <div className="trade-field">
                    <label>{t("tradein.phone")}</label>

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
                  {t("tradein.sendRequest")}
                </button>
              </form>
            </div>

            <div className="offers-box" data-aos="fade-left">
              <h3>{t("tradein.interestingOffers")}</h3>

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
                      {offer.year},{" "}
                      {offer.mileage.toLocaleString(
                        i18n.language === "ru" ? "ru-RU" : "ro-RO",
                      )}{" "}
                      km, {offer.fuel}, {offer.transmission}
                    </p>
                  </div>

                  <span>
                    {offer.price.toLocaleString(
                      i18n.language === "ru" ? "ru-RU" : "ro-RO",
                    )}
                    €
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
