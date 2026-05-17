import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import mercedesLogo from "../../assets/brands/mercedes.png";
import bmwLogo from "../../assets/brands/bmw.png";
import audiLogo from "../../assets/brands/audi.png";
import skodaLogo from "../../assets/brands/skoda.png";
import toyotaLogo from "../../assets/brands/toyota.png";
import volkswagenLogo from "../../assets/brands/vw.png";
import hyundaiLogo from "../../assets/brands/hyundai.png";
import lexusLogo from "../../assets/brands/lexus.png";
import fordLogo from "../../assets/brands/ford.png";

import { getCars } from "../../services/api";
import type { Car } from "../../types/car";

import "./PopularBrands.css";

const brands = [
  { name: "Mercedes-Benz", logo: mercedesLogo },
  { name: "BMW", logo: bmwLogo },
  { name: "Audi", logo: audiLogo },
  { name: "Skoda", logo: skodaLogo },
  { name: "Toyota", logo: toyotaLogo },
  { name: "Volkswagen", logo: volkswagenLogo },
  { name: "Hyundai", logo: hyundaiLogo },
  { name: "Lexus", logo: lexusLogo },
  { name: "Ford", logo: fordLogo },
];

export default function PopularBrands() {
  const { t } = useTranslation();

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Eroare la încărcarea mărcilor:", error);
      }
    }

    loadCars();
  }, []);

  const brandCounts = useMemo(() => {
    return cars.reduce<Record<string, number>>((acc, car) => {
      const brand = car.brand?.trim();

      if (!brand) return acc;

      acc[brand] = (acc[brand] || 0) + 1;

      return acc;
    }, {});
  }, [cars]);

  return (
    <section className="popular-brands-section" data-aos="fade-up">
      <div className="main-container">
        <div className="popular-brands-header">
          <h2>{t("home.popularBrands.title")}</h2>
        </div>

        <div className="popular-brands-slider-wrap">
          <Swiper
            modules={[Pagination]}
            slidesPerView={6}
            spaceBetween={28}
            centeredSlides={false}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              520: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 22,
              },
              1100: {
                slidesPerView: 6,
                spaceBetween: 28,
              },
            }}
            className="popular-brands-swiper"
          >
            {brands.map((brand) => {
              const count = brandCounts[brand.name] || 0;

              return (
                <SwiperSlide key={brand.name}>
                  <Link
                    to={`/catalog?brand=${encodeURIComponent(
                      brand.name,
                    )}#cars-list`}
                    className="brand-card"
                  >
                    <div className="image">
                      <img src={brand.logo} alt={brand.name} />
                    </div>

                    <h3>{brand.name}</h3>

                    <p>
                      {count}{" "}
                      {count === 1
                        ? t("home.popularBrands.carSingular")
                        : t("home.popularBrands.carPlural")}
                    </p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
