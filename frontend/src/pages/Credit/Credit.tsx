import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsFillExclamationSquareFill } from "react-icons/bs";

import Maib from "../../assets/partners/maib.svg";
import Microinvest from "../../assets/partners/microinvest.svg";
import RapidCredit from "../../assets/partners/rapidcredit.svg";
import Express from "../../assets/partners/express.svg";
import Iute from "../../assets/partners/iute.svg";
import Mogo from "../../assets/partners/mogo.svg";

import "./Credit.css";

export default function Leasing() {
  const { t, i18n } = useTranslation();

  const [creditAmount, setCreditAmount] = useState(8000);
  const [months, setMonths] = useState(30);
  const [advancePercent, setAdvancePercent] = useState(10);
  const [interestRate, setInterestRate] = useState(12);

  const advanceAmount = Math.round((creditAmount * advancePercent) / 100);
  const loanAmount = creditAmount - advanceAmount;
  const monthlyInterest = interestRate / 100 / 12;

  const monthlyRate = Math.round(
    (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
      (Math.pow(1 + monthlyInterest, months) - 1),
  );

  useEffect(() => {
    document.title = `${t("credit.title")} | Fresh-Auto`;
  }, [t]);

  const currentLocale = i18n.language === "ru" ? "ru-RU" : "ro-RO";

  return (
    <>
      <section className="credit-page" data-aos="fade-down">
        <div className="main-container">
          <div className="leasing-breadcrumb-row">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("breadcrumb.home")}
              </Link>

              <span className="breadcrumb-separator">›</span>

              <span className="breadcrumb-current">
                {t("credit.breadcrumb")}
              </span>
            </nav>
          </div>

          <div className="leasing-header">
            <h1>{t("credit.title")}</h1>
            <p>{t("credit.subtitle")}</p>
          </div>

          <div className="credit-calculator-card">
            <h2>{t("credit.calculator")}</h2>

            <div className="credit-grid-layout">
              <div className="credit-left-side">
                <div className="credit-block">
                  <div className="credit-calc-row input-row">
                    <span>{t("credit.carPrice")}</span>

                    <div className="credit-input-wrap">
                      <input
                        type="text"
                        value={creditAmount}
                        maxLength={6}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setCreditAmount(Math.min(Number(value || 0), 100000));
                        }}
                      />
                      <span>€</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="500"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(Number(e.target.value))}
                  />

                  <div className="credit-range-labels">
                    <span>{t("credit.from")} 2 000 €</span>
                    <span>{t("credit.to")} 100 000 €</span>
                  </div>
                </div>

                <div className="credit-block">
                  <div className="credit-calc-row second">
                    <span>{t("credit.advance")}</span>

                    <strong>
                      {advancePercent}% /{" "}
                      {advanceAmount.toLocaleString(currentLocale)} €
                    </strong>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={advancePercent}
                    onChange={(e) => setAdvancePercent(Number(e.target.value))}
                  />

                  <div className="credit-range-labels">
                    <span>{t("credit.from")} 0%</span>
                    <span>{t("credit.to")} 90%</span>
                  </div>
                </div>
              </div>

              <div className="credit-right-side">
                <div className="credit-block">
                  <div className="credit-calc-row second">
                    <span>{t("credit.period")}</span>

                    <strong>
                      {months} {t("credit.months")}
                    </strong>
                  </div>

                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                  />

                  <div className="credit-range-labels">
                    <span>
                      {t("credit.from")} 6 {t("credit.months")}
                    </span>

                    <span>
                      {t("credit.to")} 60 {t("credit.months")}
                    </span>
                  </div>
                </div>

                <div className="credit-block">
                  <div className="credit-calc-row second">
                    <span>{t("credit.interest")}</span>

                    <strong>
                      {interestRate}% {t("credit.annual")}
                    </strong>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />

                  <div className="credit-range-labels">
                    <span>{t("credit.from")} 5%</span>
                    <span>{t("credit.to")} 25%</span>
                  </div>
                </div>
              </div>

              <div className="credit-bottom-full">
                <div className="credit-result">
                  {t("credit.monthlyRate")}{" "}
                  <span>{monthlyRate.toLocaleString(currentLocale)} €</span>
                </div>

                <div className="triger">
                  <BsFillExclamationSquareFill className="triger-icon" />
                  <p>{t("credit.disclaimer")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partners" data-aos="fade-up">
        <div className="main-container">
          <section className="leasing-partners">
            <div className="main-container">
              <div className="partners-header">
                <h2>{t("credit.partnersTitle")}</h2>
                <p>{t("credit.partnersSubtitle")}</p>
              </div>

              <div className="partners-flex">
                <div className="partner-card">
                  <div className="partners-cards">
                    <img src={Maib} alt="MAIB Leasing" />
                  </div>
                  <div className="partners-info">
                    <a href="https://leasing.md" target="_black">
                      Leasing.md
                    </a>
                  </div>
                </div>

                <div className="partner-card">
                  <div className="partners-cards">
                    <img src={Microinvest} alt="Microinvest" />
                  </div>
                  <div className="partners-info">
                    <a href="https://www.microinvest.md" target="_black">
                      Microinvest.md
                    </a>
                  </div>
                </div>

                <div className="partner-card">
                  <div className="partners-cards">
                    <img src={RapidCredit} alt="Credit Rapid" />
                  </div>
                  <div className="partners-info">
                    <a href="https://creditrapid.md" target="_black">
                      Creditrapid.md
                    </a>
                  </div>
                </div>

                <div className="partner-card">
                  <div className="partners-cards">
                    <img src={Express} alt="Express Leasing" />
                  </div>
                  <div className="partners-info">
                    <a href="https://www.expressleasing.md" target="_black">
                      Expressleasing.md
                    </a>
                  </div>
                </div>

                <div className="partner-card">
                  <div className="partners-cards">
                    <img src={Iute} alt="IuteCredit" />
                  </div>
                  <div className="partners-info">
                    <a href="https://www.iute.md" target="_black">
                      Iute.md
                    </a>
                  </div>
                </div>

                <div className="partner-card">
                  <div className="partners-cards">
                    <img src={Mogo} alt="Mogo" />
                  </div>
                  <div className="partners-info">
                    <a href="https://www.mogo.md" target="_black">
                      Mogo.md
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
