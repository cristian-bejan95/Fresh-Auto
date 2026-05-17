import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCars } from "../../services/api";
import type { Car } from "../../types/car";
import { FaLongArrowAltRight } from "react-icons/fa";
import PremiumCarCard from "../PremiumCarCard/PremiumCarCard";
import "./TopPromotions.css";

export default function TopPromotions() {
  const { t } = useTranslation();

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Eroare promoții:", error);
      }
    }

    loadCars();
  }, []);

  const promoCars = useMemo(() => {
    return cars.filter((car) => car.status === "discount").slice(0, 3);
  }, [cars]);

  if (promoCars.length === 0) return null;

  return (
    <section className="top-promotions-section">
      <div className="main-container">
        <div className="top-promotions-header">
          <h2>{t("home.promotions.title")}</h2>

          <Link to="/promotii" className="top-promotions-link">
            {t("home.promotions.viewAll")}
            <FaLongArrowAltRight style={{ marginLeft: 8 }} />
          </Link>
        </div>

        <div className="top-promotions-grid">
          {promoCars.map((car) => (
            <div className="top-promo-item" key={car._id}>
              <div className="top-promo-custom">
                <PremiumCarCard car={car} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
