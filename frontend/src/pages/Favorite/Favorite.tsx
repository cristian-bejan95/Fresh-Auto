import { useEffect, useState } from "react";
import { getCars } from "../../services/api";
import PremiumCarCard from "../../components/PremiumCarCard/PremiumCarCard";
import type { Car } from "../../types/car";
import "./Favorite.css";
import { Link } from "react-router-dom";
import { IoCarSport } from "react-icons/io5";
import FavoriteImg from "../../assets/favorite.svg";

export default function Favorite() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Favorite | Fresh-Auto";

    async function loadFavorites() {
      try {
        const favoriteIds: string[] = JSON.parse(
          localStorage.getItem("favorites") || "[]",
        );

        const data = await getCars();

        const favoriteCars = data.filter((car: Car) =>
          favoriteIds.includes(car._id),
        );

        setCars(favoriteCars);
      } catch (error) {
        console.error("Eroare favorite:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();

    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  return (
    <section className="favorite-page">
      <div className="main-container">
        <div className="favorite-breadcrumb-row">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Pagina principală
            </Link>

            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>

            <span className="breadcrumb-current">Favorite</span>
          </nav>
        </div>
        <div className="favorite-header">
          <h2>Automobile favorite</h2>
        </div>

        {loading ? (
          <p>Se încarcă...</p>
        ) : cars.length === 0 ? (
          <div className="favorite-empty">
            <span className="favorite-empty-img">
              <img
                src={FavoriteImg}
                alt="Favorite"
                className="favorite-empty-fv"
              />
            </span>
            <p>Nu ai adăugat încă mașini la favorite.</p>
            <Link to="/catalog" className="favorite-empty-btn">
              <IoCarSport />
              Mergi la catalog
            </Link>
          </div>
        ) : (
          <section className="catalog-grid-light">
            {cars.map((car) => (
              <PremiumCarCard key={car._id} car={car} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
}
