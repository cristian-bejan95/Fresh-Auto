import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getCars } from "../../services/api";
import "./Catalog.css";
import { CiSearch } from "react-icons/ci";
import { TbBrandMercedes } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";
import { GiGearStickPattern } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import { BsFuelPumpFill } from "react-icons/bs";
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
  images: string[];
  status: "available" | "reserved" | "sold" | "discount";
  featured: boolean;
};

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

function CatalogCarCard({ car }: { car: Car }) {
  const hasDiscount = car.oldPrice && car.oldPrice > car.price;
  const [favorite, setFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = (car.images || []).slice(0, 5);
  const currentImage = images[currentIndex];

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite((prev) => !prev);
  };

  return (
    <article className="premium-car-card">
      <Link
        to={`/cars/${car._id}`}
        className="premium-card-image"
        onMouseMove={(e) => {
          if (images.length <= 1) return;

          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percent = x / rect.width;

          const newIndex = Math.floor(percent * images.length);
          const safeIndex = Math.min(images.length - 1, Math.max(0, newIndex));

          if (safeIndex !== currentIndex) {
            setCurrentIndex(safeIndex);
          }
        }}
        onMouseLeave={() => {
          setCurrentIndex(0);
        }}
      >
        {car.status === "discount" && (
          <span className="badge-diagonal-green">Promoție</span>
        )}

        {currentImage ? (
          <img src={currentImage} alt={car.title} />
        ) : (
          <div className="premium-no-image">Fără imagine</div>
        )}

        {hasDiscount && <span className="premium-badge">Reducere</span>}

        <button
          type="button"
          className={`premium-favorite ${favorite ? "active" : ""}`}
          onClick={toggleFavorite}
        >
          <GrFavorite />
        </button>

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
          <h3>{car.title}</h3>
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
  );
}

function Catalog() {
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

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  const brandTabsRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
    document.title = "Catalog auto | Fresh-Auto";
    loadCars();
  }, []);

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

    if (brand) result = result.filter((car) => car.brand === brand);
    if (model) result = result.filter((car) => car.model === model);
    if (fuel) result = result.filter((car) => car.fuel === fuel);
    if (transmission)
      result = result.filter((car) => car.transmission === transmission);
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
    search,
  ]);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
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
    search,
  ]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

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
    setCurrentPage(1);
    loadCars("");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />

      <main className="catalog-page-light">
        <div className="catalog-container">
          <div className="catalog-breadcrumb-row">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>

              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>

              <span className="breadcrumb-current">Catalog</span>
            </nav>

            <span className="catalog-results-count">
              Afișez {filteredCars.length} din {cars.length} rezultate
            </span>
          </div>

          <section className="catalog-filter-panel">
            <div className="filter-grid">
              <div className="filter-field">
                <FilterSelect
                  label="Marca"
                  value={brand}
                  placeholder="Selectează"
                  options={brands}
                  onChange={(value) => {
                    setBrand(value);
                    setModel("");
                  }}
                />
              </div>

              <div className="filter-field">
                <FilterSelect
                  label="Model"
                  value={model}
                  placeholder={
                    brand ? "Alege modelul" : "Selectează marca întâi"
                  }
                  options={models.filter((item) =>
                    cars.some(
                      (car) => car.brand === brand && car.model === item,
                    ),
                  )}
                  onChange={setModel}
                  disabled={!brand}
                />
              </div>

              <div className="filter-field">
                <FilterSelect
                  label="Carburant"
                  value={fuel}
                  placeholder="Selectează"
                  options={fuels}
                  onChange={setFuel}
                />
              </div>

              <div className="filter-field small">
                <label>An de la</label>
                <input
                  type="number"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="1995"
                />
              </div>

              <div className="filter-field small">
                <label>An pînă la</label>
                <input
                  type="number"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="2026"
                />
              </div>

              <div className="filter-field">
                <FilterSelect
                  label="Transmisie"
                  value={transmission}
                  placeholder="Selectează"
                  options={transmissions}
                  onChange={setTransmission}
                />
              </div>

              <div className="filter-field">
                <FilterSelect
                  label="Tracțiune"
                  value={wheldrive}
                  placeholder="Selectează"
                  options={wheldrives}
                  onChange={setwheldrive}
                />
              </div>

              <div className="filter-field">
                <FilterSelect
                  label="Culoare"
                  value={color}
                  placeholder="Selectează"
                  options={colors}
                  onChange={setColor}
                />
              </div>

              <div className="filter-field small">
                <label>Rulaja de la</label>
                <input
                  type="number"
                  value={kmFrom}
                  onChange={(e) => setKmFrom(e.target.value)}
                  placeholder="1 Km"
                />
              </div>

              <div className="filter-field small">
                <label>Rulaj până la</label>
                <input
                  type="number"
                  value={kmTo}
                  onChange={(e) => setKmTo(e.target.value)}
                  placeholder="500000 Km"
                />
              </div>

              <div className="filter-field small">
                <label>Preț minim (€)</label>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                />
              </div>

              <div className="filter-field small">
                <label>Preț maxim (€)</label>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                />
              </div>

              <div className="filter-field filter-search-wide">
                <label>Căutare auto</label>

                <div className="catalog-filter-search">
                  <input
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearch(value);
                      setCurrentPage(1);
                      loadCars(value);
                    }}
                    placeholder="Caută marcă, model"
                  />
                  <CiSearch className="search-icon-loop" />
                </div>
              </div>

              <div className="filter-field filter-reset-box">
                <label>&nbsp;</label>
                <button type="button" onClick={resetFilters}>
                  ↻ Resetare Filtru
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
                  className={`brand-tab ${brand === item.name ? "active" : ""}`}
                  onClick={(e) => {
                    if (isDragging.current) return;

                    setBrand(item.name);
                    setModel("");
                    setCurrentPage(1);

                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }}
                  title={item.name}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </section>

          <section className="catalog-list-header">
            <h1>Toate Automobilele</h1>
            <div className="select-inner">
              <select
                value={sort}
                onFocus={() => setOpenSort(true)}
                onBlur={() => setOpenSort(false)}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                  setOpenSort(false);
                }}
              >
                <option value="" disabled>
                  Sortează după
                </option>

                <option value="newest">Cele mai noi</option>
                <option value="oldest">Cele mai vechi</option>
                <option value="price-asc">Preț crescător</option>
                <option value="price-desc">Preț descrescător</option>
                <option value="km-asc">Kilometraj crescător</option>
                <option value="km-desc">Kilometraj descrescător</option>
              </select>

              <span className="select-plus">{openSort ? "−" : "+"}</span>
            </div>
          </section>

          {loading ? (
            <p className="catalog-loading">Se încarcă mașinile...</p>
          ) : filteredCars.length === 0 ? (
            <p className="catalog-empty">Nu am găsit mașini.</p>
          ) : (
            <>
              <section className="catalog-grid-light">
                {paginatedCars.map((car) => (
                  <CatalogCarCard car={car} key={car._id} />
                ))}
              </section>

              {totalPages > 1 && (
                <div className="catalog-pagination">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((prev) => prev - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => {
                        setCurrentPage(index + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((prev) => prev + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Catalog;
