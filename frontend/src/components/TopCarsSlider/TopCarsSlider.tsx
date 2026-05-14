import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../../services/api";
import type { Car } from "../../types/car";
import { FaLongArrowAltRight } from "react-icons/fa";
import PremiumCarCard from "../PremiumCarCard/PremiumCarCard";
import "./TopCarsSlider.css";

export default function TopCarsSlider() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Eroare la încărcarea mașinilor:", error);
      }
    }

    loadCars();
  }, []);

  const topCars = useMemo(() => {
    return cars
      .filter((car) => car.status !== "discount" && car.status !== "sold")
      .slice(0, 3);
  }, [cars]);

  if (topCars.length === 0) return null;

  return (
    <section className="top-cars-section">
      <div className="main-container">
        <div className="top-cars-header">
          <h2>Adăugate recent</h2>

          <Link to="/catalog" className="top-cars-link">
            Vezi toate
            <FaLongArrowAltRight style={{ marginLeft: 8 }} />
          </Link>
        </div>

        <div className="top-cars-grid">
          {topCars.map((car) => (
            <div className="top-car-item" key={car._id}>
              <div className="top-car-custom">
                <PremiumCarCard car={car} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
