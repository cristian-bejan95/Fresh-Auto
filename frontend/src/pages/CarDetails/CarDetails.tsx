import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css/bundle";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getCarById, getCars } from "../../services/api";
import "./CarDetails.css";
import { FaPhone } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaGasPump, FaCalendarAlt, FaRoad, FaPalette } from "react-icons/fa";
import { GiGearStickPattern, GiCarWheel } from "react-icons/gi";
import { TbEngineFilled } from "react-icons/tb";
import { MdSpeed } from "react-icons/md";
import microinvest from "../../assets/logos/microinvest.svg";
import easycredit from "../../assets/logos/ecredit.svg";
import iutecredit from "../../assets/logos/iutecredit.svg";
import mogo from "../../assets/logos/mogo.svg";
import creditrapid from "../../assets/logos/creditrapid.svg";
import maib from "../../assets/logos/maib.svg";
import reportImg from "../../assets/report.jpg";
import { FaFileAlt, FaListAlt, FaCheckSquare } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";

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
  options?: string[];
};

export default function CarDetails() {
  const { id } = useParams();
  const [offers, setOffers] = useState<Car[]>([]);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [advancePercent, setAdvancePercent] = useState(10);
  const [months, setMonths] = useState(60);
  const advance = Math.round(((car?.price || 0) * advancePercent) / 100);
  const credit = (car?.price || 0) - advance;
  const monthly = Math.round(credit / months);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [phone, setPhone] = useState("+373 ");
  const [phoneError, setPhoneError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "descriere" | "general" | "dotari"
  >("general");

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
  const [showOfferForm, setShowOfferForm] = useState(false);

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

  const validateMDPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 3) return "Introduceți numărul de telefon";
    if (digits.length !== 11) return "Numărul trebuie să conțină 8 cifre";

    const mdNumber = digits.slice(3);

    if (!/^[267]\d{7}$/.test(mdNumber)) {
      return "Număr invalid";
    }

    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMDPhone(e.target.value);
    setPhone(formatted);
    setPhoneError(validateMDPhone(formatted));
  };

  const handlePhoneBlur = () => {
    setPhoneError(validateMDPhone(phone));
  };

  const optionCategories = [
    {
      title: "Confort",
      keywords: ["climat", "scaune", "incalz", "volan", "cruise", "keyless"],
    },
    {
      title: "Siguranță",
      keywords: ["abs", "esp", "airbag", "isofix", "franare"],
    },
    {
      title: "Multimedia",
      keywords: ["navig", "bluetooth", "carplay", "android", "audio", "usb"],
    },
    {
      title: "Exterior",
      keywords: ["jante", "faruri", "led", "xenon", "panor", "trapa"],
    },
    {
      title: "Interior",
      keywords: ["piele", "alcantara", "ambient", "cotiera"],
    },
    {
      title: "Asistență",
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
            <div className="details-left-column">
              <section className="details-left" ref={sliderRef}>
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

              <section className="details-characteristics">
                <div className="details-characteristics-flex">
                  <h2>{car.title}</h2>
                  <div className="details-characteristics-price">
                    <strong>{car.price.toLocaleString("ro-RO")}€</strong>

                    {hasDiscount && (
                      <span className="price-old">
                        {car.oldPrice!.toLocaleString("ro-RO")}€
                      </span>
                    )}
                  </div>
                </div>

                <div className="car-detail-tabs">
                  <button
                    className={`car-tab-btn ${activeTab === "descriere" ? "active" : ""}`}
                    onClick={() => setActiveTab("descriere")}
                  >
                    <FaFileAlt />
                    Descriere
                  </button>
                  <button
                    className={`car-tab-btn ${activeTab === "general" ? "active" : ""}`}
                    onClick={() => setActiveTab("general")}
                  >
                    <FaListAlt />
                    Prezentare generală
                  </button>
                  <button
                    className={`car-tab-btn ${activeTab === "dotari" ? "active" : ""}`}
                    onClick={() => setActiveTab("dotari")}
                  >
                    <FaCheckSquare />
                    Dotări
                  </button>
                </div>

                {activeTab === "general" && (
                  <div className="details-specs-grid">
                    <div className="spec-card">
                      <div className="spec-icon">
                        <FaCalendarAlt />
                      </div>

                      <div className="spec-content">
                        <span>Anul fabricație:</span>
                        <strong>{car.year}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <FaRoad />
                      </div>
                      <div className="spec-content">
                        <span>Parcurs:</span>
                        <strong>
                          {car.mileage.toLocaleString("ro-RO")} Km
                        </strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <GiGearStickPattern />
                      </div>
                      <div className="spec-content">
                        <span>Cutie viteze:</span>
                        <strong>{car.transmission}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <FaGasPump />
                      </div>
                      <div className="spec-content">
                        <span>Combustibil:</span>
                        <strong>{car.fuel}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <TbEngineFilled />
                      </div>
                      <div className="spec-content">
                        <span>Capacitatea:</span>
                        <strong>{car.engine}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <MdSpeed />
                      </div>
                      <div className="spec-content">
                        <span>Putere Motor:</span>
                        <strong>{car.power}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <FaPalette />
                      </div>
                      <div className="spec-content">
                        <span>Culoare exterior:</span>
                        <strong>{car.color}</strong>
                      </div>
                    </div>

                    <div className="spec-card">
                      <div className="spec-icon">
                        <GiCarWheel />
                      </div>
                      <div className="spec-content">
                        <span>Tracțiune:</span>
                        <strong>{car.wheldrive || "Nespecificat"}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "descriere" && (
                  <div className="details-specs-descr">
                    <h2>Descriere</h2>
                    <p>
                      {car.description ||
                        "Nu există descriere pentru acest automobil."}
                    </p>
                  </div>
                )}

                {/* Optiuni si dotari */}

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
                <h2>Locația Fresh Auto</h2>
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
              <div className="details-buttons-contacts">
                <Link
                  to="/trade-in"
                  target="_blank"
                  className="details-buttons-contacts-tradein"
                >
                  Solicită Trade-in
                </Link>
                <a
                  href="tel:37360000000"
                  target="_blank"
                  className="details-buttons-contacts-phone"
                >
                  <FaPhone style={{ marginRight: 8 }} />
                  +373
                  <span> 60 000 000</span>
                </a>
              </div>
              <div className="car-report-box">
                <div className="car-report-preview">
                  <div className="report-paper">
                    <img src={reportImg} alt="Raport auto" />
                  </div>
                </div>
                <div className="car-report-content">
                  <h3>Raport CarVertical</h3>
                  <p>
                    Obțineți un raport detaliat al vehiculului în doar câteva
                    minute.
                  </p>

                  <div className="car-report-action">
                    <a
                      href="https://www.carvertical.com/md"
                      target="_blank"
                      className="car-report-btn"
                    >
                      Obține raport
                    </a>
                  </div>
                </div>
              </div>

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

                    <p>Avans</p>
                    <strong>{advance.toLocaleString("ro-RO")}€</strong>

                    <strong>{credit.toLocaleString("ro-RO")}€</strong>

                    <p>Rata lunară</p>
                    <strong className="finance-red">
                      {monthly.toLocaleString("ro-RO")}€
                    </strong>

                    <button
                      type="button"
                      className="finance-btn"
                      onClick={() => setShowOfferForm(true)}
                    >
                      Solicită ofertă
                      <FaArrowRight style={{ marginLeft: 8 }} />
                    </button>
                  </div>
                </div>

                {showOfferForm && (
                  <div className="finance-contact-box show">
                    <h2>Vă sunăm pentru detalii</h2>
                    <p>Completează datele și te contactăm în scurt timp.</p>

                    <div className="finance-contact-row">
                      <div className="finance-contact-field">
                        <label>Nume</label>
                        <input type="text" />
                      </div>

                      <div className="finance-contact-field">
                        <label>Telefon</label>
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
                      Trimite
                    </button>
                  </div>
                )}
                <div className="partners-box">
                  <h3>Parteneri</h3>

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

              <div className="offers-box">
                <h3>Oferte interesante</h3>

                <div className="offer-line" />

                {offers.map((offer) => (
                  <Link
                    to={`/cars/${offer._id}`}
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
                        {offer.year}, {offer.mileage.toLocaleString("ro-RO")}{" "}
                        km, {offer.fuel}, {offer.transmission}
                      </p>
                    </div>

                    <span>{offer.price.toLocaleString("ro-RO")}€</span>
                  </Link>
                ))}
              </div>
            </aside>
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
