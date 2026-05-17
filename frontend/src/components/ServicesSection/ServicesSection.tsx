import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SellAuto from "../../assets/services/auto-sell.svg";
import EvaluareAuto from "../../assets/services/evaluare-auto.svg";
import AutoTrade from "../../assets/services/trade.svg";
import Finance from "../../assets/services/creditauto.svg";

import "./ServicesSection.css";

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <img src={SellAuto} alt="Vanzare Auto" className="services-icon" />,
      title: t("home.services.sellTitle"),
      text: t("home.services.sellText"),
      link: "/catalog",
    },

    {
      icon: (
        <img src={EvaluareAuto} alt="Evaluare Auto" className="services-icon" />
      ),
      title: t("home.services.evaluateTitle"),
      text: t("home.services.evaluateText"),
      link: "/trade-in",
    },

    {
      icon: <img src={AutoTrade} alt="Auto-Trade" className="services-icon" />,
      title: t("home.services.tradeTitle"),
      text: t("home.services.tradeText"),
      link: "/trade-in",
    },

    {
      icon: <img src={Finance} alt="Leasing" className="services-icon" />,
      title: t("home.services.financeTitle"),
      text: t("home.services.financeText"),
      link: "/leasing",
    },
  ];

  const stats = [
    {
      number: "7+",
      label: t("home.stats.years"),
    },

    {
      number: "300+",
      label: t("home.stats.soldCars"),
    },

    {
      number: "100+",
      label: t("home.stats.availableCars"),
    },

    {
      number: "100+",
      label: t("home.stats.tradeCars"),
    },
  ];

  return (
    <section className="services-section" data-aos="fade-down">
      <div className="main-container">
        <div className="services-top">
          <h2>{t("home.services.title")}</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <Link to={service.link} className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.text}</p>
            </Link>
          ))}
        </div>

        <div className="stats-box">
          {stats.map((item, index) => (
            <>
              <div className="stat-item" key={index}>
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>

              {index !== stats.length - 1 && <div className="stat-divider" />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
