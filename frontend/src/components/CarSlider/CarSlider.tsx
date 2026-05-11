import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "./CarSlider.css";

import hero1 from "../../assets/Home/home-hero.png";
import hero2 from "../../assets/Home/home-hero-2.png";

const slides = [
  {
    image: hero1,
    title: "Găsește automobilul perfect pentru tine la Fresh Auto",
    text: "Peste 100 de automobile disponibile în stoc",
  },

  {
    image: hero2,
    title: "Descoperă cele mai avantajoase oferte la Fresh Auto",
    text: "Economisește inteligent la următoarea mașină",
  },
];

export default function HeroSlider() {
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
                    <FaCheck /> Automobile verificate
                  </span>
                  <span>
                    <FaCheck /> Credit rapid
                  </span>
                  <span>
                    <FaCheck /> Suport complet
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
