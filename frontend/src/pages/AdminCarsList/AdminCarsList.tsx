import { useEffect, useMemo, useState } from "react";
import { deleteCar, getCars } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./AdminCarsList.css";

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
  description: string;
  images: string[];
  status: "available" | "reserved" | "sold";
  featured: boolean;
};

export default function AdminCarsList() {
  const navigate = useNavigate();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const loadCars = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCars();
      setCars(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Eroare la încărcarea mașinilor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const filteredCars = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) return cars;

    return cars.filter((car) => {
      return (
        car.title.toLowerCase().includes(term) ||
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        String(car.year).includes(term) ||
        car.status.toLowerCase().includes(term)
      );
    });
  }, [cars, search]);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Sigur vrei să ștergi această mașină?");
    if (!ok) return;

    try {
      await deleteCar(id);
      await loadCars();
    } catch (err: any) {
      alert(err.message || "Eroare la ștergere");
    }
  };

  return (
    <div className="admin-cars-page">
      <div className="admin-cars-overlay" />

      <aside className="admin-cars-sidebar">
        <div className="admin-cars-logo">
          <h2>Fresh-Auto</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-cars-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/add-car">Adaugă mașină</Link>
          <Link to="/dashboard/cars" className="active">
            Toate mașinile
          </Link>
          <Link to="/">Vezi site-ul</Link>
        </nav>

        <button className="admin-cars-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-cars-main">
        <header className="admin-cars-topbar">
          <div>
            <p className="admin-cars-topbar-label">Panou administrativ</p>
            <h1>Toate mașinile</h1>
          </div>

          <div className="admin-cars-user-box">
            <div className="admin-cars-user-avatar">A</div>
            <div>
              <strong>Administrator</strong>
            </div>
          </div>
        </header>

        <section className="admin-cars-toolbar-card">
          <div className="admin-cars-toolbar-left">
            <h3>Stoc auto</h3>
            <p>Gestionează rapid toate mașinile din sistem</p>
          </div>

          <div className="admin-cars-toolbar-right">
            <input
              type="text"
              placeholder="Caută după titlu, brand, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-cars-search"
            />
            <Link to="/dashboard/add-car" className="admin-cars-add-btn">
              + Adaugă mașină
            </Link>
          </div>
        </section>

        <section className="admin-cars-list-card">
          {loading && <p>Se încarcă mașinile...</p>}
          {error && <p className="admin-cars-error">{error}</p>}

          {!loading && !error && filteredCars.length === 0 && (
            <p className="admin-cars-empty">Nu există mașini găsite.</p>
          )}

          {!loading && !error && filteredCars.length > 0 && (
            <div className="admin-cars-list">
              {filteredCars.map((car) => (
                <div className="admin-car-row" key={car._id}>
                  <div className="admin-car-image-wrap">
                    <img
                      src={
                        car.images?.[0] ||
                        "https://via.placeholder.com/220x150?text=No+Image"
                      }
                      alt={car.title}
                      className="admin-car-image"
                    />
                  </div>

                  <div className="admin-car-info">
                    <div className="admin-car-header">
                      <div>
                        <h3>{car.title}</h3>
                        <p>
                          {car.brand} • {car.model} • {car.year}
                        </p>
                      </div>

                      <div className="admin-car-price">{car.price} €</div>
                    </div>

                    <div className="admin-car-meta">
                      <span>{car.mileage} km</span>
                      <span>{car.fuel}</span>
                      <span>{car.transmission}</span>
                      <span>{car.engine}</span>
                      <span>{car.power}</span>
                      <span>{car.color}</span>
                    </div>

                    <div className="admin-car-footer">
                      <div className="admin-car-badges">
                        <span className={`admin-car-status ${car.status}`}>
                          {car.status === "available" && "Disponibilă"}
                          {car.status === "reserved" && "Rezervată"}
                          {car.status === "sold" && "Vândută"}
                        </span>

                        {car.featured && (
                          <span className="admin-car-featured">Featured</span>
                        )}
                      </div>

                      <div className="admin-car-actions">
                        <Link
                          to={`/dashboard/edit-car/${car._id}`}
                          className="admin-car-edit-btn"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(car._id)}
                          className="admin-car-delete-btn"
                        >
                          Șterge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
