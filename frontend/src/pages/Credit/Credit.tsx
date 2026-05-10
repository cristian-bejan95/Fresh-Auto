import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import "./Credit.css";

export default function Leasing() {
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
    document.title = "Leasing | Fresh-Auto";
  }, []);

  return (
    <section className="credit-page">
      <div className="main-container">
        <div className="leasing-breadcrumb-row">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Pagina principală
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Leasing</span>
          </nav>
        </div>

        <div className="leasing-header">
          <h1>Credit Auto</h1>
          <p>
            Aprobare rapidă în mai puțin de 24h doar cu buletinul de identitate
          </p>
        </div>

        <div className="credit-calculator-card">
          <h2>Calculator Credit Auto</h2>

          <div className="credit-grid-layout">
            <div className="credit-left-side">
              <div className="credit-block">
                <div className="credit-calc-row input-row">
                  <span>Preț Automobil</span>

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
                  <span>de la 2 000 €</span>
                  <span>până la 100 000 €</span>
                </div>
              </div>

              <div className="credit-block">
                <div className="credit-calc-row second">
                  <span>Avans</span>
                  <strong>
                    {advancePercent}% / {advanceAmount.toLocaleString("ro-RO")}{" "}
                    €
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
                  <span>de la 0%</span>
                  <span>până la 90%</span>
                </div>
              </div>
            </div>

            <div className="credit-right-side">
              <div className="credit-block">
                <div className="credit-calc-row second">
                  <span>Termenul creditului</span>
                  <strong>{months} luni</strong>
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
                  <span>de la 6 luni</span>
                  <span>până la 60 luni</span>
                </div>
              </div>

              <div className="credit-block">
                <div className="credit-calc-row second">
                  <span>Rata dobânzii</span>
                  <strong>{interestRate}% anual</strong>
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
                  <span>de la 5%</span>
                  <span>până la 25%</span>
                </div>
              </div>
            </div>

            <div className="credit-bottom-full">
              <div className="credit-result">
                Rata lunară <span>{monthlyRate.toLocaleString("ro-RO")} €</span>
              </div>

              <div className="triger">
                <BsFillExclamationSquareFill className="triger-icon" />
                <p>
                  Calculatorul financiar are caracter informativ și oferă
                  estimări aproximative ale ratelor lunare. Valoarea finală a
                  creditului poate varia în funcție de suma finanțată, avans,
                  perioada aleasă, rata dobânzii și condițiile partenerilor
                  financiari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
