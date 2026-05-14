import { Link } from "react-router-dom";
import SellAuto from "../../assets/services/auto-sell.svg";
import EvaluareAuto from "../../assets/services/evaluare-auto.svg";
import AutoTrade from "../../assets/services/trade.svg";
import Finance from "../../assets/services/creditauto.svg";

import "./ServicesSection.css";

const services = [
  {
    icon: <img src={SellAuto} alt="Vanzare Auto" className="services-icon" />,
    title: "Vînzarea mașinii",
    text: "Selectați marca și modelul mașinii care vi se potrivește",
    link: "/catalog",
  },
  {
    icon: (
      <img src={EvaluareAuto} alt="Evaluare Auto" className="services-icon" />
    ),
    title: "Evaluarea auto",
    text: "Primește o evaluare transparentă a mașinii tale",
    link: "/trade-in",
  },
  {
    icon: <img src={AutoTrade} alt="Auto-Trade" className="services-icon" />,
    title: "Schimb auto",
    text: "Utilizați mașina dvs. veche ca avans pentru a cumpăra o mașină nouă",
    link: "/trade-in",
  },
  {
    icon: <img src={Finance} alt="Leasing" className="services-icon" />,
    title: "Finanțare rapidă",
    text: "Aprobare rapidă și condiții flexibile de la partenerii noștrii",
    link: "/leasing",
  },
];

export default function ServicesSection() {
  return (
    <section className="services-section" data-aos="fade-down">
      <div className="main-container">
        <div className="services-top">
          <h2>Serviciile noastre</h2>
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
      </div>
    </section>
  );
}
