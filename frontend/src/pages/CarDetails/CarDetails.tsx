import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css/bundle";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getCarById } from "../../services/api";
import "./CarDetails.css";

import { FaGasPump, FaCalendarAlt, FaRoad, FaPalette } from "react-icons/fa";
import { GiGearStickPattern, GiCarWheel } from "react-icons/gi";
import { TbEngine } from "react-icons/tb";
import { MdSpeed } from "react-icons/md";

type Car = {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  oldPrice?: number;
  mileage: number;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  color: string;
  wheldrive?: string;
  description: string;
  images: string[];
  status: "available" | "reserved" | "sold" | "discount";
  featured: boolean;
  body?: string;
  seats?: string;
};

export default function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [advancePercent, setAdvancePercent] = useState(10);
  const [months, setMonths] = useState(60);

  const advance = Math.round(((car?.price || 0) * advancePercent) / 100);
  const credit = (car?.price || 0) - advance;
  const monthly = Math.round(credit / months);

  const increaseAdvance = () => {
    setAdvancePercent((prev) => Math.min(prev + 5, 90));
  };

  const decreaseAdvance = () => {
    setAdvancePercent((prev) => Math.max(prev - 5, 10));
  };

  const increaseMonths = () => {
    setMonths((prev) => Math.min(prev + 6, 60));
  };

  const decreaseMonths = () => {
    setMonths((prev) => Math.max(prev - 6, 6));
  };

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleWheel = () => {
      closeLightbox();
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [lightboxOpen]);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      try {
        const data = await getCarById(id);
        setCar(data);
        document.title = `${data.title} | Fresh-Auto`;
      } catch (error) {
        console.error("Eroare la încărcarea mașinii:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCar();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="details-loading">Se încarcă...</div>
        <Footer />
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Header />
        <div className="details-loading">Mașina nu a fost găsită.</div>
        <Footer />
      </>
    );
  }

  const images = car.images || [];
  const hasDiscount = Number(car.oldPrice) > Number(car.price);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Header />

      <main className="car-details-page">
        <div className="car-details-container">
          <div className="details-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>
            <Link to="/catalog">Catalog</Link>
            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>
            {car.title}
          </div>

          <div className="details-layout">
            <section className="details-left">
              <div className="details-main-slider">
                <button className="custom-prev">
                  <FiChevronLeft />
                </button>

                <button className="custom-next">
                  <FiChevronRight />
                </button>

                {car.status === "discount" && (
                  <span className="details-discount-ribbon">Promoție</span>
                )}

                {images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Thumbs]}
                    navigation={{
                      prevEl: ".custom-prev",
                      nextEl: ".custom-next",
                    }}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="main-car-swiper"
                  >
                    {images.map((img, index) => (
                      <SwiperSlide
                        key={index}
                        style={{ backgroundImage: `url(${img})` }}
                      >
                        <img
                          src={img}
                          alt={`${car.title} ${index + 1}`}
                          onClick={() => openLightbox(index)}
                          className="details-clickable-image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="details-no-image">Fără imagine</div>
                )}
              </div>

              {images.length > 1 && (
                <Swiper
                  modules={[FreeMode, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={12}
                  slidesPerView="auto"
                  freeMode
                  watchSlidesProgress
                  className="thumbs-car-swiper"
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </section>

            <aside className="details-right-column">
              <div className="finance-box">
                <div className="finance-header">
                  <h3>Calculator financiar</h3>
                </div>

                <div className="finance-line" />

                <div className="finance-grid">
                  <div>
                    <p>Prețul mașinii</p>

                    <div className="finance-stepper">
                      <button onClick={decreaseAdvance}>−</button>
                      <span>{advancePercent}%</span>
                      <button onClick={increaseAdvance}>+</button>
                    </div>

                    <p>Soldul rămas în credit</p>

                    <div className="finance-stepper">
                      <button onClick={decreaseMonths}>−</button>
                      <span>{months} luni</span>
                      <button onClick={increaseMonths}>+</button>
                    </div>
                  </div>

                  <div className="finance-values">
                    <strong>{car.price.toLocaleString("ro-RO")}€</strong>

                    <p>Avans (minim 10%)</p>
                    <strong>{advance.toLocaleString("ro-RO")}€</strong>

                    <strong>{credit.toLocaleString("ro-RO")}€</strong>

                    <p>Rata lunară</p>
                    <strong className="finance-red">
                      {monthly.toLocaleString("ro-RO")}€
                    </strong>
                    <a href="tel:+37360000000" className="finance-btn">
                      Solicita ofertă
                    </a>
                  </div>
                </div>
              </div>

              <div className="offers-box">
                <h3>Oferte interesante</h3>

                <div className="offer-item">
                  <div className="offer-image-placeholder"></div>
                  <div>
                    <strong>{car.title}</strong>
                    <p>
                      {car.mileage.toLocaleString("ro-RO")} km, {car.fuel},{" "}
                      {car.transmission}
                    </p>
                  </div>
                  <span>{car.price.toLocaleString("ro-RO")}€</span>
                </div>
              </div>
            </aside>

            <section className="details-characteristics">
              <div className="details-characteristics-flex">
                <h2>Caracteristici {car.title}</h2>
                <div className="details-characteristics-price">
                  <strong>{car.price.toLocaleString("ro-RO")}€</strong>

                  {hasDiscount && (
                    <span className="price-old">
                      {car.oldPrice!.toLocaleString("ro-RO")}€
                    </span>
                  )}
                </div>
              </div>

              <div className="details-specs-grid">
                <div className="spec-card">
                  <FaCalendarAlt />
                  <div>
                    <span>Anul fabricație</span>
                    <strong>{car.year}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <FaRoad />
                  <div>
                    <span>Parcurs</span>
                    <strong>{car.mileage.toLocaleString("ro-RO")} Km</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <GiGearStickPattern />
                  <div>
                    <span>Cutie viteze</span>
                    <strong>{car.transmission}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <FaGasPump />
                  <div>
                    <span>Combustibil</span>
                    <strong>{car.fuel}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <TbEngine />
                  <div>
                    <span>Cilindree</span>
                    <strong>{car.engine}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <MdSpeed />
                  <div>
                    <span>Putere</span>
                    <strong>{car.power}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <FaPalette />
                  <div>
                    <span>Culoare exterior</span>
                    <strong>{car.color}</strong>
                  </div>
                </div>

                <div className="spec-card">
                  <GiCarWheel />
                  <div>
                    <span>Tracțiune</span>
                    <strong>{car.wheldrive || "Nespecificat"}</strong>
                  </div>
                </div>
              </div>
              <h2>Descriere</h2>
              <p>
                {car.description ||
                  "Nu există descriere pentru acest automobil."}
              </p>
            </section>
          </div>
        </div>
      </main>

      {lightboxOpen && (
        <div className="car-lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>

          <button
            className="lightbox-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
          >
            <FiChevronLeft className="lightbox-arrow-left-svg" />
          </button>

          <div
            className="lightbox-image-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${car.title} fullscreen`}
              className="lightbox-main-image"
            />
          </div>

          <button
            className="lightbox-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
          >
            <FiChevronRight className="lightbox-arrow-right-svg" />
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
