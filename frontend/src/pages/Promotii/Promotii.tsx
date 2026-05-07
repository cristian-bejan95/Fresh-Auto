import { useEffect, useState } from "react";
import { getCars } from "../../services/api";
import "./Promotii.css";
import PremiumCarCard from "../../components/PremiumCarCard/PremiumCarCard";
import type { Car } from "../../types/car";
import { FiRefreshCw } from "react-icons/fi";

export default function Promotii() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    document.title = "Promoții și oferte speciale | Fresh-Auto";
  }, []);

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
    <section className="promotii-page">
      <div className="main-container">
        <div className="promotii-header">
          <h2>Promoții și oferte speciale</h2>
          <p>Descoperă cele mai avantajoase oferte Fresh Auto.</p>
        </div>

        {loading ? (
          <p>Se încarcă promoțiile...</p>
        ) : cars.length === 0 ? (
          <p>Momentan nu sunt automobile la promoție.</p>
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
              Încarcă mai multe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
