import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getCars } from "../../services/api";
import "./Catalog.css";
import { CiSearch } from "react-icons/ci";

type Car = {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  color: string;
  wheldrive?: string;
  images: string[];
  status: "available" | "reserved" | "sold";
  featured: boolean;
};

function Catalog() {
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
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
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

  const tractions = useMemo(
    () => [...new Set(cars.map((car) => car.wheldrive).filter(Boolean))],
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
  ]);

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
    setSort("newest");
    loadCars("");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />

      <main className="catalog-page-light">
        <div className="catalog-container">
          <div className="catalog-breadcrumb-row">
            <p>
              <Link to="/">Home</Link> » Catalog
            </p>
            <span>
              Afișez {filteredCars.length} din {cars.length} rezultate
            </span>
          </div>

          <section className="catalog-filter-panel">
            <div className="filter-grid">
              <div className="filter-field">
                <label>Marca</label>
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setModel("");
                  }}
                >
                  <option value="">Selectează</option>
                  {brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-field">
                <label>Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand} // 🔥 cheia
                >
                  <option value="">
                    {brand ? "Alege modelul" : "Selectează Marca"}
                  </option>

                  {models
                    .filter((item) => {
                      if (!brand) return false;
                      return cars.find(
                        (car) => car.model === item && car.brand === brand,
                      );
                    })
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>

              <div className="filter-field">
                <label>Carburant</label>
                <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                  <option value="">Selectează</option>
                  {fuels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
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
                <label>An până la</label>
                <input
                  type="number"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="2026"
                />
              </div>

              <div className="filter-field">
                <label>Transmisie</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="">Selectează</option>
                  {transmissions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-field">
                <label>Tracțiune</label>
                <select
                  value={wheldrive}
                  onChange={(e) => setwheldrive(e.target.value)}
                >
                  <option value="">Selectează</option>
                  {tractions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-field">
                <label>Culoare</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Selectează</option>
                  {colors.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-field small">
                <label>KM de la</label>
                <input
                  type="number"
                  value={kmFrom}
                  onChange={(e) => setKmFrom(e.target.value)}
                  placeholder="1"
                />
              </div>

              <div className="filter-field small">
                <label>KM până la</label>
                <input
                  type="number"
                  value={kmTo}
                  onChange={(e) => setKmTo(e.target.value)}
                  placeholder="500.000"
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
                      loadCars(value);
                    }}
                    placeholder="Caută mașină"
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

            <div className="filter-bottom-row">
              <p>
                ⚠ În cazul în care nu apar rezultate, te rugăm să elimini din
                filtre.
              </p>
            </div>
          </section>

          <section className="catalog-list-header">
            <h1>Toate mașinile</h1>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Cele mai noi</option>
              <option value="oldest">Cele mai vechi</option>
              <option value="price-asc">Preț crescător</option>
              <option value="price-desc">Preț descrescător</option>
              <option value="km-asc">Kilometri puțini</option>
            </select>
          </section>

          {loading ? (
            <p className="catalog-loading">Se încarcă mașinile...</p>
          ) : filteredCars.length === 0 ? (
            <p className="catalog-empty">Nu am găsit mașini.</p>
          ) : (
            <section className="catalog-grid-light">
              {filteredCars.map((car) => (
                <article className="catalog-card-light" key={car._id}>
                  <Link to={`/cars/${car._id}`} className="catalog-image-light">
                    {car.images?.[0] ? (
                      <img src={car.images[0]} alt={car.title} />
                    ) : (
                      <div className="catalog-no-image">Fără imagine</div>
                    )}

                    {car.featured && (
                      <span className="featured-label">Important</span>
                    )}
                  </Link>

                  <div className="catalog-card-light-body">
                    <div className="catalog-title-line">
                      <h3>{car.title}</h3>
                      <span>{car.year}</span>
                    </div>

                    <p>
                      {car.mileage.toLocaleString("ro-RO")} km, {car.engine},{" "}
                      {car.fuel}, {car.transmission}
                      {car.wheldrive ? `, ${car.wheldrive}` : ""}
                    </p>

                    <div className="catalog-card-bottom-line">
                      <strong>{car.price.toLocaleString("ro-RO")}€</strong>
                      <Link to={`/cars/${car._id}`}>Detalii</Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default Catalog;
