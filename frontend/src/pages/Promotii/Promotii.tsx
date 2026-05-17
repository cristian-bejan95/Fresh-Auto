import { useEffect, useState } from "react";
import { getCars } from "../../services/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Car } from "../../types/car";
import { FiRefreshCw } from "react-icons/fi";

import PremiumCarCard from "../../components/PremiumCarCard/PremiumCarCard";
import PageLoader from "../../components/PageLoader/PageLoader";
import "./Promotii.css";

export default function Promotii() {
  const { t } = useTranslation();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    document.title = `${t("promotions.pageTitle")} | Fresh-Auto`;
  }, [t]);

  useEffect(() => {
    async function loadPromotii() {
      try {
        const data = await getCars();

        const discountCars = data.filter(
          (car: Car) =>
            car.status === "discount" &&
            Number(car.oldPrice) > Number(car.price),
        );

        setCars(discountCars);
      } catch (error) {
        console.error("Eroare promoții:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPromotii();
  }, []);

  return (
    <section className="promotii-page" data-aos="fade-down">
      <div className="main-container">
        <div className="promotii-breadcrumb-row">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              {t("breadcrumb.home")}
            </Link>

            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>

            <span className="breadcrumb-current">
              {t("promotions.breadcrumb")}
            </span>
          </nav>
        </div>

        <div className="promotii-header">
          <h2>{t("promotions.title")}</h2>
          <p>{t("promotions.subtitle")}</p>
        </div>

        {loading ? (
          <PageLoader />
        ) : cars.length === 0 ? (
          <p>{t("promotions.empty")}</p>
        ) : (
          <section className="catalog-grid-light">
            {cars.slice(0, visibleCount).map((car) => (
              <PremiumCarCard key={car._id} car={car} />
            ))}
          </section>
        )}

        {visibleCount < cars.length && (
          <div className="load-more-wrap">
            <button
              type="button"
              className="load-more-btn-minimal"
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
              <FiRefreshCw className="load-icon" />
              {t("common.loadMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
