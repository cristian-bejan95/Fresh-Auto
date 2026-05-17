import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FilterCars from "../../components/FilterCars/FilterCars";
import "./CarSlider.css";

import hero1 from "../../assets/Home/home-hero.png";
import hero2 from "../../assets/Home/home-hero-2.png";

export default function HeroSlider() {
  const { t } = useTranslation();

  const slides = [
    {
      image: hero1,
      title: t("home.hero.slide1Title"),
      text: t("home.hero.slide1Text"),
    },
    {
      image: hero2,
      title: t("home.hero.slide2Title"),
      text: t("home.hero.slide2Text"),
    },
  ];

  return (
    <section className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="hero-overlay" />

              <div className="main-container">
                <div className="hero-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                </div>

                <div className="home-hero-benefits">
                  <span>
                    <FaCheck /> {t("home.hero.verified")}
                  </span>

                  <span>
                    <FaCheck /> {t("home.hero.fastCredit")}
                  </span>

                  <span>
                    <FaCheck /> {t("home.hero.fullSupport")}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <FilterCars />
    </section>
  );
}
