import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCars } from "../../services/api";
import { CiSearch } from "react-icons/ci";
import { TbBrandMercedes } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import type { Car } from "../../types/car";
import PremiumCarCard from "../../components/PremiumCarCard/PremiumCarCard";
import PageLoader from "../../components/PageLoader/PageLoader";

import "./Catalog.css";

import {
  SiBmw,
  SiRenault,
  SiToyota,
  SiVolkswagen,
  SiAudi,
  SiFord,
  SiSkoda,
  SiNissan,
  SiKia,
  SiDacia,
  SiHyundai,
  SiVolvo,
  SiTesla,
  SiHonda,
  SiMazda,
  SiMitsubishi,
  SiPeugeot,
  SiPorsche,
} from "react-icons/si";

type FilterSelectProps = {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled = false,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter-field">
      <label>{label}</label>

      <div className="select-inner">
        <select
          value={value}
          disabled={disabled}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(false);
          }}
        >
          <option value="">{placeholder}</option>

          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <span className="select-plus">{open ? "−" : "+"}</span>
      </div>
    </div>
  );
}

export default function Catalog() {
  const { t } = useTranslation();

  const brandTabs = [
    { name: "Mercedes-Benz", icon: <TbBrandMercedes /> },
    { name: "BMW", icon: <SiBmw /> },
    { name: "Skoda", icon: <SiSkoda /> },
    { name: "Toyota", icon: <SiToyota /> },
    { name: "Honda", icon: <SiHonda /> },
    { name: "Audi", icon: <SiAudi /> },
    { name: "Volkswagen", icon: <SiVolkswagen /> },
    { name: "Dacia", icon: <SiDacia /> },
    { name: "Ford", icon: <SiFord /> },
    { name: "Nissan", icon: <SiNissan /> },
    { name: "Kia", icon: <SiKia /> },
    { name: "Volvo", icon: <SiVolvo /> },
    { name: "Porsche", icon: <SiPorsche /> },
    { name: "Mazda", icon: <SiMazda /> },
    { name: "Renault", icon: <SiRenault /> },
    { name: "Hyundai", icon: <SiHyundai /> },
    { name: "Tesla", icon: <SiTesla /> },
    { name: "Mitsubishi", icon: <SiMitsubishi /> },
    { name: "Peugeot", icon: <SiPeugeot /> },
  ];

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [wheldrive, setwheldrive] = useState("");
  const [color, setColor] = useState("");
  const [kmFrom, setKmFrom] = useState("");
  const [kmTo, setKmTo] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [openSort, setOpenSort] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const brandTabsRef = useRef<HTMLDivElement | null>(null);
  const carsSectionRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const brandParam = searchParams.get("brand") || "";
  const activeBrandTitle = brand || brandParam;
  const modelParam = searchParams.get("model") || "";
  const fuelParam = searchParams.get("fuel") || "";
  const transmissionParam = searchParams.get("transmission") || "";

  const loadCars = async (searchText = "") => {
    try {
      setLoading(true);
      const data = await getCars(searchText);
      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${t("catalog.pageTitle")} | Fresh-Auto`;
    loadCars();
  }, [t]);

  const brands = useMemo(
    () => [...new Set(cars.map((car) => car.brand).filter(Boolean))],
    [cars],
  );

  const models = useMemo(
    () => [...new Set(cars.map((car) => car.model).filter(Boolean))],
    [cars],
  );

  const fuels = useMemo(
    () => [...new Set(cars.map((car) => car.fuel).filter(Boolean))],
    [cars],
  );

  const transmissions = useMemo(
    () => [...new Set(cars.map((car) => car.transmission).filter(Boolean))],
    [cars],
  );

  const wheldrives = useMemo(
    () =>
      [
        ...new Set(cars.map((car) => car.wheldrive).filter(Boolean)),
      ] as string[],
    [cars],
  );

  const colors = useMemo(
    () => [...new Set(cars.map((car) => car.color).filter(Boolean))],
    [cars],
  );

  const filteredCars = useMemo(() => {
    let result = [...cars];

    const activeBrand = brand || brandParam;
    const activeModel = model || modelParam;
    const activeFuel = fuel || fuelParam;
    const activeTransmission = transmission || transmissionParam;

    const term = search.toLowerCase().trim();

    if (term) {
      result = result.filter(
        (car) =>
          car.title.toLowerCase().includes(term) ||
          car.brand.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term) ||
          String(car.year).includes(term),
      );
    }

    if (activeBrand) result = result.filter((car) => car.brand === activeBrand);
    if (activeModel) result = result.filter((car) => car.model === activeModel);
    if (activeFuel) result = result.filter((car) => car.fuel === activeFuel);
    if (activeTransmission)
      result = result.filter((car) => car.transmission === activeTransmission);

    if (wheldrive) result = result.filter((car) => car.wheldrive === wheldrive);
    if (color) result = result.filter((car) => car.color === color);

    if (yearFrom) result = result.filter((car) => car.year >= Number(yearFrom));
    if (yearTo) result = result.filter((car) => car.year <= Number(yearTo));

    if (kmFrom) result = result.filter((car) => car.mileage >= Number(kmFrom));
    if (kmTo) result = result.filter((car) => car.mileage <= Number(kmTo));

    if (priceMin)
      result = result.filter((car) => car.price >= Number(priceMin));
    if (priceMax)
      result = result.filter((car) => car.price <= Number(priceMax));

    if (sort === "newest") result.sort((a, b) => b.year - a.year);
    if (sort === "oldest") result.sort((a, b) => a.year - b.year);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "km-asc") result.sort((a, b) => a.mileage - b.mileage);
    if (sort === "km-desc") result.sort((a, b) => b.mileage - a.mileage);

    return result;
  }, [
    cars,
    search,
    brand,
    model,
    yearFrom,
    yearTo,
    fuel,
    transmission,
    wheldrive,
    color,
    kmFrom,
    kmTo,
    priceMin,
    priceMax,
    sort,
    brandParam,
    modelParam,
    fuelParam,
    transmissionParam,
  ]);

  useEffect(() => {
    const hasFilters =
      brandParam || modelParam || fuelParam || transmissionParam;

    if (hasFilters) {
      setTimeout(() => {
        carsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [brandParam, modelParam, fuelParam, transmissionParam]);

  useEffect(() => {
    if (location.hash === "#cars-list") {
      setTimeout(() => {
        const section = document.getElementById("cars-list");

        if (section) {
          const offset = 120;
          const y =
            section.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  }, [location]);

  const resetFilters = () => {
    setSearch("");
    setBrand("");
    setModel("");
    setYearFrom("");
    setYearTo("");
    setFuel("");
    setTransmission("");
    setwheldrive("");
    setColor("");
    setKmFrom("");
    setKmTo("");
    setPriceMin("");
    setPriceMax("");
    setSort("");
    setVisibleCount(12);
    loadCars("");
    navigate("/catalog");
    window.scrollTo(0, 0);
  };

  return (
    <div className="catalog-page-light">
      <div className="main-container" data-aos="fade-down">
        <div className="catalog-breadcrumb-row">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              {t("breadcrumb.home")}
            </Link>

            <span className="breadcrumb-separator" aria-hidden="true">
              ›
            </span>

            <span className="breadcrumb-current">
              {t("catalog.breadcrumb")}
            </span>
          </nav>

          <span className="catalog-results-count">
            {t("catalog.showing")} {filteredCars.length} {t("catalog.of")}{" "}
            {cars.length} {t("catalog.results")}
          </span>
        </div>

        <section className="catalog-filter-panel">
          <div className="filter-grid">
            <div className="filter-field">
              <FilterSelect
                label={t("catalog.brand")}
                value={brand}
                placeholder={t("catalog.select")}
                options={brands}
                onChange={(value) => {
                  setBrand(value);
                  setModel("");
                }}
              />
            </div>

            <div className="filter-field">
              <FilterSelect
                label={t("catalog.model")}
                value={model}
                placeholder={
                  brand
                    ? t("catalog.chooseModel")
                    : t("catalog.selectBrandFirst")
                }
                options={models.filter((item) =>
                  cars.some((car) => car.brand === brand && car.model === item),
                )}
                onChange={setModel}
                disabled={!brand}
              />
            </div>

            <div className="filter-field">
              <FilterSelect
                label={t("catalog.fuel")}
                value={fuel}
                placeholder={t("catalog.select")}
                options={fuels}
                onChange={setFuel}
              />
            </div>

            <div className="filter-field small">
              <label>{t("catalog.yearFrom")}</label>
              <input
                type="number"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                placeholder="1995"
              />
            </div>

            <div className="filter-field small">
              <label>{t("catalog.yearTo")}</label>
              <input
                type="number"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                placeholder="2026"
              />
            </div>

            <div className="filter-field">
              <FilterSelect
                label={t("catalog.transmission")}
                value={transmission}
                placeholder={t("catalog.select")}
                options={transmissions}
                onChange={setTransmission}
              />
            </div>

            <div className="filter-field">
              <FilterSelect
                label={t("catalog.drive")}
                value={wheldrive}
                placeholder={t("catalog.select")}
                options={wheldrives}
                onChange={setwheldrive}
              />
            </div>

            <div className="filter-field">
              <FilterSelect
                label={t("catalog.color")}
                value={color}
                placeholder={t("catalog.select")}
                options={colors}
                onChange={setColor}
              />
            </div>

            <div className="filter-field small">
              <label>{t("catalog.kmFrom")}</label>
              <input
                type="number"
                value={kmFrom}
                onChange={(e) => setKmFrom(e.target.value)}
                placeholder="1 Km"
              />
            </div>

            <div className="filter-field small">
              <label>{t("catalog.kmTo")}</label>
              <input
                type="number"
                value={kmTo}
                onChange={(e) => setKmTo(e.target.value)}
                placeholder="500000 Km"
              />
            </div>

            <div className="filter-field small">
              <label>{t("catalog.priceMin")}</label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="Min"
              />
            </div>

            <div className="filter-field small">
              <label>{t("catalog.priceMax")}</label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Max"
              />
            </div>

            <div className="filter-field filter-search-wide">
              <label>{t("catalog.searchAuto")}</label>

              <div className="catalog-filter-search">
                <input
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    loadCars(value);
                  }}
                  placeholder={t("catalog.searchPlaceholder")}
                />
                <CiSearch className="search-icon-loop" />
              </div>
            </div>

            <div className="filter-field filter-reset-box">
              <label>&nbsp;</label>
              <button type="button" onClick={resetFilters}>
                ↻ {t("catalog.reset")}
              </button>
            </div>
          </div>

          <div
            className="brand-tabs"
            ref={brandTabsRef}
            onMouseDown={(e) => {
              if (!brandTabsRef.current) return;

              isDragging.current = true;
              startX.current = e.pageX - brandTabsRef.current.offsetLeft;
              scrollLeft.current = brandTabsRef.current.scrollLeft;
            }}
            onMouseMove={(e) => {
              if (!isDragging.current || !brandTabsRef.current) return;

              e.preventDefault();

              const x = e.pageX - brandTabsRef.current.offsetLeft;
              const walk = (x - startX.current) * 1.5;

              brandTabsRef.current.scrollLeft = scrollLeft.current - walk;
            }}
            onMouseUp={() => {
              isDragging.current = false;
            }}
            onMouseLeave={() => {
              isDragging.current = false;
            }}
          >
            {brandTabs.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`brand-tab ${
                  (brand || brandParam) === item.name ? "active" : ""
                }`}
                onClick={(e) => {
                  if (isDragging.current) return;

                  const selected =
                    (brand || brandParam) === item.name ? "" : item.name;

                  setBrand(selected);
                  setModel("");
                  setVisibleCount(12);

                  if (selected) {
                    navigate(
                      `/catalog?brand=${encodeURIComponent(selected)}#cars-list`,
                    );
                  } else {
                    navigate("/catalog#cars-list");
                  }

                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });

                  setTimeout(() => {
                    const section = document.getElementById("cars-list");

                    if (section) {
                      const offset = 120;
                      const y =
                        section.getBoundingClientRect().top +
                        window.scrollY -
                        offset;

                      window.scrollTo({
                        top: y,
                        behavior: "smooth",
                      });
                    }
                  }, 150);
                }}
                title={item.name}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </section>

        <section className="catalog-list-header" id="cars-list">
          <h1>
            {activeBrandTitle
              ? `${t("catalog.allCars")} ${activeBrandTitle}`
              : t("catalog.allCars")}
          </h1>

          <div className="select-inner">
            <select
              value={sort}
              onFocus={() => setOpenSort(true)}
              onBlur={() => setOpenSort(false)}
              onChange={(e) => {
                setSort(e.target.value);
                setOpenSort(false);
              }}
            >
              <option value="" disabled>
                {t("catalog.sort")}
              </option>

              <option value="newest">{t("catalog.newest")}</option>
              <option value="oldest">{t("catalog.oldest")}</option>
              <option value="price-asc">{t("catalog.priceAsc")}</option>
              <option value="price-desc">{t("catalog.priceDesc")}</option>
              <option value="km-asc">{t("catalog.kmAsc")}</option>
              <option value="km-desc">{t("catalog.kmDesc")}</option>
            </select>

            <span className="select-plus">{openSort ? "−" : "+"}</span>
          </div>
        </section>

        {loading ? (
          <PageLoader />
        ) : filteredCars.length === 0 ? (
          <p className="catalog-empty">{t("catalog.noCars")}</p>
        ) : (
          <section className="catalog-grid-light" ref={carsSectionRef}>
            {filteredCars.slice(0, visibleCount).map((car) => (
              <PremiumCarCard car={car} key={car._id} />
            ))}
          </section>
        )}

        {visibleCount < filteredCars.length && (
          <div className="load-more-wrap">
            <button
              type="button"
              className="load-more-btn-minimal"
              onClick={() => setVisibleCount((prev) => prev + 8)}
            >
              <FiRefreshCw className="load-icon" />
              {t("common.loadMore")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
