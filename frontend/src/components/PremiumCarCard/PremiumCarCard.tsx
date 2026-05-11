import { useState } from "react";
import { Link } from "react-router-dom";
import { GiGearStickPattern } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import { BsFuelPumpFill } from "react-icons/bs";
import "./PremiumCarCard.css";
import type { Car } from "../../types/car";
import { GrFavorite } from "react-icons/gr";

type Props = {
  car: Car;
};

export default function PremiumCarCard({ car }: Props) {
  const hasDiscount = car.oldPrice && car.oldPrice > car.price;
  const [toast, setToast] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = (car.images || []).slice(0, 5);
  const currentImage = images[currentIndex];

  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    return saved.includes(car._id);
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const saved: string[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    let updatedFavorites;

    if (saved.includes(car._id)) {
      updatedFavorites = saved.filter((id) => id !== car._id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...saved, car._id];
      setIsFavorite(true);
    }

    if (saved.includes(car._id)) {
      updatedFavorites = saved.filter((id) => id !== car._id);
      setIsFavorite(false);
      setToast("Șters din favorite");
    } else {
      updatedFavorites = [...saved, car._id];
      setIsFavorite(true);
      setToast("Adăugat la favorite");
    }

    setTimeout(() => setToast(""), 1800);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <>
      <article className="premium-car-card" data-aos="fade-up">
        <Link
          to={`/cars/${car._id}`}
          className="premium-card-image"
          onMouseMove={(e) => {
            if (images.length <= 1) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;

            const newIndex = Math.floor(percent * images.length);

            const safeIndex = Math.min(
              images.length - 1,
              Math.max(0, newIndex),
            );

            if (safeIndex !== currentIndex) {
              setCurrentIndex(safeIndex);
            }
          }}
          onMouseLeave={() => {
            setCurrentIndex(0);
          }}
        >
          {car.status === "discount" && (
            <span className="badge-diagonal-green">Preț redus</span>
          )}

          {car.status === "available" && (
            <span className="badge-diagonal-available">În stoc</span>
          )}

          {car.status === "sold" && (
            <span className="badge-diagonal-sold">Vîndută</span>
          )}

          {car.status === "reserved" && (
            <span className="badge-diagonal-reserved">Rezervată</span>
          )}

          <button
            type="button"
            className={`premium-favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            <GrFavorite />
          </button>

          {currentImage ? (
            <img src={currentImage} alt={car.title} />
          ) : (
            <div className="premium-no-image">Fără imagine</div>
          )}

          {hasDiscount && <span className="premium-badge">Reducere</span>}

          {images.length > 1 && (
            <div className="premium-slider-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`premium-slider-dot ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              ))}
            </div>
          )}
        </Link>

        <div className="premium-card-body">
          <div className="premium-card-title-row">
            <Link to={`/cars/${car._id}`} className="car-title-link">
              <h3>{car.title}</h3>
            </Link>
            <span>{car.year}</span>
          </div>

          <div className="car-specs-box">
            <div className="spec-box-item">
              <GiGearStickPattern />
              <span>{car.transmission}</span>
            </div>

            <div className="spec-box-item">
              <TbEngine />
              <span>{car.engine}</span>
            </div>

            <div className="spec-box-item">
              <MdSpeed />
              <span>{car.mileage.toLocaleString("ro-RO")} km</span>
            </div>

            <div className="spec-box-item">
              <BsFuelPumpFill />
              <span>{car.fuel}</span>
            </div>
          </div>

          <div className="premium-card-bottom">
            <div className="price-sale-box">
              <strong className="price-main">
                {car.price.toLocaleString("ro-RO")}€
              </strong>

              {hasDiscount && (
                <span className="price-old">
                  {car.oldPrice!.toLocaleString("ro-RO")}€
                </span>
              )}
            </div>

            <div className="price-month-box">
              <span>Rată de la</span>

              <strong>{Math.round(car.price / 60)}€</strong>

              <small>/lună</small>
            </div>
          </div>
        </div>
      </article>
      {toast && (
        <div className="favorite-toast active">
          <GrFavorite />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
