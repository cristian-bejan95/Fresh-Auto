import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCars } from "../../services/api";
import type { Car } from "../../types/car";
import PremiumCarCard from "../PremiumCarCard/PremiumCarCard";
import "./TopCarsSlider.css";

export default function TopCarsSlider() {
  const [cars, setCars] = useState<Car[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

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
    return cars.filter((car) => car.status !== "discount").slice(0, 6);
  }, [cars]);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "right" ? 340 : -340,
      behavior: "smooth",
    });
  };

  if (topCars.length === 0) return null;

  return (
    <section className="top-cars-section">
      <div className="main-container">
        <div className="top-cars-header">
          <div>
            <h2>Mașini Noi</h2>
          </div>

          <div className="top-cars-actions">
            <button onClick={() => scrollSlider("left")}>
              <FaChevronLeft />
            </button>

            <button onClick={() => scrollSlider("right")}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="top-cars-slider" ref={sliderRef}>
          {topCars.map((car) => (
            <div className="top-car-slide" key={car._id}>
              <PremiumCarCard car={car} />
            </div>
          ))}
        </div>

        <div className="top-cars-footer">
          <Link to="/catalog" className="view-all-cars-btn">
            Vezi toate mașinile
          </Link>
        </div>
      </div>
    </section>
  );
}
