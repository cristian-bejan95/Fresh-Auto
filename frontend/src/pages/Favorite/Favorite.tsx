import { useEffect, useState } from "react";
import { getCars } from "../../services/api";
import type { Car } from "../../types/car";
import { Link } from "react-router-dom";
import { IoCarSport } from "react-icons/io5";
import PremiumCarCard from "../../components/PremiumCarCard/PremiumCarCard";
import FavoriteImg from "../../assets/favorite.svg";
import PageLoader from "../../components/PageLoader/PageLoader";
import { useTranslation } from "react-i18next";
import "./Favorite.css";

export default function Favorite() {
  const { t } = useTranslation();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${t("favorite.title")} | Fresh-Auto`;

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
  }, [t]);

  return (
    <section className="favorite-page" data-aos="fade-down">
      <div className="main-container">
        <div className="favorite-breadcrumb-row">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              {t("breadcrumb.home")}
            </Link>

            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>

            <span className="breadcrumb-current">{t("favorite.title")}</span>
          </nav>
        </div>

        <div className="favorite-header">
          <h2>{t("favorite.title")}</h2>
        </div>

        {loading ? (
          <PageLoader />
        ) : cars.length === 0 ? (
          <div className="favorite-empty">
            <span className="favorite-empty-img">
              <img
                src={FavoriteImg}
                alt="Favorite"
                className="favorite-empty-fv"
              />
            </span>

            <p>{t("favorite.empty")}</p>

            <Link to="/catalog" className="favorite-empty-btn">
              <IoCarSport />
              {t("favorite.goCatalog")}
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
