import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { getCarById, getCars } from "../../services/api";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import {
  TbListDetails,
  TbAutomaticGearboxFilled,
  TbGaugeFilled,
} from "react-icons/tb";
import { MdOutlineVerifiedUser, MdLocalGasStation } from "react-icons/md";
import {
  FaCheck,
  FaWhatsapp,
  FaViber,
  FaTelegramPlane,
  FaArrowRight,
} from "react-icons/fa";
import {
  PiCalendarBlankBold,
  PiRoadHorizonBold,
  PiEngineBold,
  PiPaletteFill,
} from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { LiaTelegramPlane } from "react-icons/lia";
import { GrFavorite } from "react-icons/gr";
import type { Car } from "../../types/car";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import microinvest from "../../assets/logos/microinvest.svg";
import easycredit from "../../assets/logos/ecredit.svg";
import iutecredit from "../../assets/logos/iutecredit.svg";
import mogo from "../../assets/logos/mogo.svg";
import creditrapid from "../../assets/logos/creditrapid.svg";
import maib from "../../assets/logos/maib.svg";
import reportImg from "../../assets/report.jpg";
import PageLoader from "../../components/PageLoader/PageLoader";
import PriceBox from "../../components/PriceBox/PriceBox";
import "swiper/css/bundle";
import "./CarDetails.css";

export default function CarDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const homePath = i18n.language === "ru" ? "/ru" : "/";
  const catalogPath = i18n.language === "ru" ? "/ru/catalog" : "/catalog";
  const tradeInPath = i18n.language === "ru" ? "/ru/trade-in" : "/trade-in";
  const locale = i18n.language === "ru" ? "ru-RU" : "ro-RO";

  const [offers, setOffers] = useState<Car[]>([]);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [advancePercent, setAdvancePercent] = useState(10);
  const [months, setMonths] = useState(60);
  const [phone, setPhone] = useState("+373 ");
  const [isFavorite, setIsFavorite] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "descriere" | "general" | "dotari"
  >("general");

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showOfferForm, setShowOfferForm] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);

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

  const formatMDPhone = (value: string) => {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("373")) {
      digits = digits.slice(3);
    }

    digits = digits.slice(0, 8);

    let formatted = "+373 ";

    if (digits.length > 0) formatted += digits.slice(0, 2);
    if (digits.length > 2) formatted += " " + digits.slice(2, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 8);

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMDPhone(e.target.value);
    setPhone(formatted);
  };

  const handlePhoneBlur = () => {};

  const optionCategories = [
    {
      title: t("details.options.comfort"),
      keywords: ["climat", "scaune", "incalz", "volan", "cruise", "keyless"],
    },
    {
      title: t("details.options.safety"),
      keywords: ["abs", "esp", "airbag", "isofix", "franare"],
    },
    {
      title: t("details.options.multimedia"),
      keywords: ["navig", "bluetooth", "carplay", "android", "audio", "usb"],
    },
    {
      title: t("details.options.exterior"),
      keywords: ["jante", "faruri", "led", "xenon", "panor", "trapa"],
    },
    {
      title: t("details.options.interior"),
      keywords: ["piele", "alcantara", "ambient", "cotiera"],
    },
    {
      title: t("details.options.assistance"),
      keywords: ["camera", "senzori", "parcare", "lane", "blind", "pilot"],
    },
  ];

  const getOptionsByCategory = (keywords: string[]) => {
    if (!car?.options) return [];

    return car.options.filter((option: string) =>
      keywords.some((k) => option.toLowerCase().includes(k.toLowerCase())),
    );
  };

  useEffect(() => {
    setActiveTab("general");
  }, [car]);

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
    const header =
      document.querySelector(".header") ||
      document.querySelector(".default-header");

    if (lightboxOpen) {
      header?.classList.add("header-hidden");
    } else {
      header?.classList.remove("header-hidden");
    }

    return () => {
      header?.classList.remove("header-hidden");
    };
  }, [lightboxOpen]);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      try {
        const data = await getCarById(id);
        setCar(data);

        const allCars = await getCars();

        const randomOffers = allCars
          .filter((item: Car) => item._id !== data._id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);

        setOffers(randomOffers);
      } catch (error) {
        console.error("Eroare la încărcarea mașinii:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCar();
  }, [id]);

  useEffect(() => {
    if (!car) return;

    document.title = `${car.title} ${car.year} | Fresh-Auto`;
  }, [car]);

  useEffect(() => {
    if (!car) return;

    sliderRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [car?._id]);

  useEffect(() => {
    if (!car) return;

    const favorites: string[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    setIsFavorite(favorites.includes(car._id));
  }, [car]);

  if (loading) {
    return <PageLoader />;
  }

  if (!car) {
    return <div className="details-loading">{t("details.notFound")}</div>;
  }

  const images = car.images || [];

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
      <section className="car-details-page">
        <div className="main-container">
          <div className="details-breadcrumb">
            <Link to={homePath}>{t("breadcrumb.home")}</Link>

            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>

            <Link to={catalogPath}>{t("catalog.breadcrumb")}</Link>

            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>

            {car.title}
          </div>

          <div className="details-layout">
            <div className="details-left-column">
              <section className="details-left" ref={sliderRef}>
                <div className="details-main-slider" data-aos="zoom-in">
                  <button className="custom-prev">
                    <FiChevronLeft />
                  </button>

                  <button className="custom-next">
                    <FiChevronRight />
                  </button>

                  <button
                    className={`details-favorite-btn ${
                      isFavorite ? "active" : ""
                    }`}
                    onClick={() => {
                      if (!car) return;

                      const favorites: string[] = JSON.parse(
                        localStorage.getItem("favorites") || "[]",
                      );

                      let updatedFavorites;

                      if (favorites.includes(car._id)) {
                        updatedFavorites = favorites.filter(
                          (id) => id !== car._id,
                        );
                        setIsFavorite(false);
                      } else {
                        updatedFavorites = [...favorites, car._id];
                        setIsFavorite(true);
                      }

                      localStorage.setItem(
                        "favorites",
                        JSON.stringify(updatedFavorites),
                      );

                      window.dispatchEvent(new Event("favoritesUpdated"));
                    }}
                  >
                    <GrFavorite />
                  </button>

                  {car.status === "discount" && (
                    <span className="details-discount-ribbon">
                      {t("details.status.discount")}
                    </span>
                  )}

                  {car.status === "available" && (
                    <span className="badge-diagonal-available">
                      {t("details.status.available")}
                    </span>
                  )}

                  {car.status === "sold" && (
                    <span className="badge-diagonal-sold">
                      {t("details.status.sold")}
                    </span>
                  )}

                  {car.status === "reserved" && (
                    <span className="badge-diagonal-reserved">
                      {t("details.status.reserved")}
                    </span>
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
                    <div className="details-no-image">
                      {t("details.noImage")}
                    </div>
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

              <section className="details-characteristics">
                <div className="car-detail-tabs">
                  <button
                    className={`car-tab-btn ${
                      activeTab === "descriere" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("descriere")}
                  >
                    <HiOutlineDocumentText />
                    {t("details.tabs.description")}
                  </button>

                  <button
                    className={`car-tab-btn ${
                      activeTab === "general" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    <TbListDetails />
                    {t("details.tabs.general")}
                  </button>

                  <button
                    className={`car-tab-btn ${
                      activeTab === "dotari" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("dotari")}
                  >
                    <MdOutlineVerifiedUser />
                    {t("details.tabs.options")}
                  </button>
                </div>

                {activeTab === "general" && (
                  <div className="details-specs-grid">
                    <div className="spec-card">
                      <div className="spec-icon">
                        <PiCalendarBlankBold />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.year")}</span>
                        <strong>{car.year}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <PiRoadHorizonBold />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.mileage")}</span>
                        <strong>{car.mileage.toLocaleString(locale)} Km</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <TbAutomaticGearboxFilled />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.transmission")}</span>
                        <strong>{car.transmission}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <MdLocalGasStation />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.fuel")}</span>
                        <strong>{car.fuel}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <PiEngineBold />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.engine")}</span>
                        <strong>{car.engine}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <TbGaugeFilled />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.power")}</span>
                        <strong>{car.power}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <PiPaletteFill />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.color")}</span>
                        <strong>{car.color}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <GiCarWheel />
                      </div>

                      <div className="spec-content">
                        <span>{t("details.specs.drive")}</span>
                        <strong>
                          {car.wheldrive || t("details.notSpecified")}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "descriere" && (
                  <div className="details-specs-descr">
                    <h2>{t("details.tabs.description")}</h2>

                    <p>{car.description || t("details.noDescription")}</p>
                  </div>
                )}

                {activeTab === "dotari" && (
                  <div className="car-options-section">
                    {optionCategories.map((cat) => {
                      const items = getOptionsByCategory(cat.keywords);

                      if (!items || items.length === 0) return null;

                      return (
                        <div className="option-category" key={cat.title}>
                          <h3>{cat.title}</h3>

                          <div className="car-options-grid">
                            {items.map((option: string) => (
                              <div className="car-option-card" key={option}>
                                <span>{option}</span>

                                <div className="option-check">
                                  <FaCheck />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <div className="car-location-section">
                <h2>{t("details.location")}</h2>

                <div className="car-location-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43494.7867983281!2d28.781258622362138!3d47.05152899006127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbd630210f6669%3A0xffd3ce64404fcb60!2zU3RyYWRhIFBpZXRyxINyaWVpIDMsIE1ELTIwMDUsIENoaciZaW7Eg3UsIE1vbGRvdmE!5e0!3m2!1sro!2s!4v1777747265218!5m2!1sro!2s"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <aside className="details-right-column">
              <div className="details-side-card">
                <h2 className="side-price">
                  {car.price.toLocaleString(locale)} €
                </h2>

                <h3 className="side-title">
                  {car.title}, {car.year}
                </h3>

                <a href="tel:+37378170101" className="side-phone-btn">
                  <FaPhone />
                  +373 (78) 170 101
                </a>
                <div className="side-socials">
                  <a
                    href="https://wa.me/37378170101"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp className="whatsapp" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="https://t.me/freshauto"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTelegramPlane className="telegram" />
                    <span>Telegram</span>
                  </a>

                  <a href="viber://chat?number=%2B37378170101">
                    <FaViber className="viber" />
                    <span>Viber</span>
                  </a>
                </div>

                <p className="side-help-text">{t("details.contactHelp")}</p>

                <div className="side-report-box">
                  <div className="side-report-top">
                    <img src={reportImg} alt="CarVertical" />

                    <div>
                      <h3>{t("details.report.title")}</h3>
                      <p>{t("details.report.text")}</p>
                    </div>
                  </div>

                  <a
                    href="https://www.carvertical.com/md"
                    target="_blank"
                    rel="noreferrer"
                    className="side-report-btn"
                  >
                    {t("details.report.button")}
                    <FiExternalLink />
                  </a>
                </div>
                <Link to={tradeInPath} className="side-trade-btn">
                  <HiOutlineSwitchHorizontal />
                  {t("details.tradeInBtn")}
                </Link>
              </div>

              <div className="finance-box">
                <div className="finance-header">
                  <h3>{t("details.finance.title")}</h3>
                </div>

                <div className="finance-line" />

                <div className="finance-grid">
                  <div>
                    <p>{t("details.finance.carPrice")}</p>

                    <div className="finance-stepper">
                      <button onClick={decreaseAdvance}>−</button>
                      <span>{advancePercent}%</span>
                      <button onClick={increaseAdvance}>+</button>
                    </div>

                    <p>{t("details.finance.creditBalance")}</p>

                    <div className="finance-stepper">
                      <button onClick={decreaseMonths}>−</button>
                      <span>
                        {months} {t("credit.months")}
                      </span>
                      <button onClick={increaseMonths}>+</button>
                    </div>
                  </div>

                  <div className="finance-values">
                    <strong>{car.price.toLocaleString(locale)}€</strong>

                    <p>{t("details.finance.advance")}</p>
                    <strong>{advance.toLocaleString(locale)}€</strong>

                    <strong>{credit.toLocaleString(locale)}€</strong>

                    <p>{t("details.finance.monthlyRate")}</p>
                    <strong className="finance-red">
                      {monthly.toLocaleString(locale)}€
                    </strong>

                    <button
                      type="button"
                      className="finance-btn"
                      onClick={() => setShowOfferForm(true)}
                    >
                      {t("details.finance.requestOffer")}
                      <FaArrowRight style={{ marginLeft: 8 }} />
                    </button>
                  </div>
                </div>

                {showOfferForm && (
                  <div className="finance-contact-box show">
                    <h2>{t("details.finance.callTitle")}</h2>

                    <p>{t("details.finance.callText")}</p>

                    <div className="finance-contact-row">
                      <div className="finance-contact-field">
                        <label>{t("tradein.name")}</label>
                        <input type="text" />
                      </div>

                      <div className="finance-contact-field">
                        <label>{t("contacts.phoneLabel")}</label>

                        <input
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          onBlur={handlePhoneBlur}
                          inputMode="numeric"
                          placeholder="+373 69 123 456"
                        />
                      </div>
                    </div>

                    <button type="button" className="finance-contact-submit">
                      <LiaTelegramPlane style={{ marginRight: 8 }} />
                      {t("details.finance.send")}
                    </button>
                  </div>
                )}

                <div className="partners-box">
                  <h3>{t("details.partners")}</h3>

                  <div className="partners-grid">
                    <div className="partner-logo">
                      <img src={creditrapid} alt="Creditrapid" />
                    </div>

                    <div className="partner-logo">
                      <img src={maib} alt="Maib" />
                    </div>

                    <div className="partner-logo">
                      <img src={microinvest} alt="Microinvest" />
                    </div>

                    <div className="partner-logo">
                      <img src={iutecredit} alt="Iutecredit" />
                    </div>

                    <div className="partner-logo">
                      <img src={easycredit} alt="eCredit" />
                    </div>

                    <div className="partner-logo">
                      <img src={mogo} alt="Mogo" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="offers-box" data-aos="fade-left">
                <h3>{t("tradein.interestingOffers")}</h3>

                <div className="offer-line" />

                {offers.map((offer) => (
                  <Link
                    to={
                      i18n.language === "ru"
                        ? `/ru/cars/${offer._id}`
                        : `/cars/${offer._id}`
                    }
                    key={offer._id}
                    className="offer-item"
                  >
                    <img
                      src={offer.images?.[0] || "/placeholder-car.jpg"}
                      alt={offer.title}
                    />

                    <div>
                      <strong>{offer.title}</strong>

                      <p>
                        {offer.year}, {offer.mileage.toLocaleString(locale)} km,{" "}
                        {offer.fuel}, {offer.transmission}
                      </p>
                    </div>

                    <span>{offer.price.toLocaleString(locale)}€</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

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
    </>
  );
}
