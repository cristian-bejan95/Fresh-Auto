import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { getCarStats } from "../../services/api";

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
  createdAt?: string;
};

type StatsResponse = {
  total: number;
  available: number;
  reserved: number;
  sold: number;
  recentCars: Car[];
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<StatsResponse>({
    total: 0,
    available: 0,
    reserved: 0,
    sold: 0,
    recentCars: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  useEffect(() => {
    document.title = "Dashboard | Fresh-Auto Admin";
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCarStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Eroare la încărcarea dashboard-ului");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-overlay" />

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Fresh-Auto</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-menu">
          <Link to="/dashboard" className="active">
            Dashboard
          </Link>
          <Link to="/dashboard/add-car">Adaugă mașină</Link>
          <Link to="/dashboard/cars">Toate mașinile</Link>
          <Link to="/">Vezi site-ul</Link>
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-label">Panou administrativ</p>
            <h1>Dashboard</h1>
          </div>

          <div className="admin-user-box">
            <div className="admin-user-avatar">A</div>
            <div>
              <strong>Administrator</strong>
            </div>
          </div>
        </header>

        {loading && <p>Se încarcă datele...</p>}
        {error && <p style={{ color: "#ff9f9f" }}>{error}</p>}

        {!loading && !error && (
          <>
            <section className="admin-stats-grid">
              <div className="admin-stat-card">
                <p>Total mașini</p>
                <h3>{stats.total}</h3>
                <span>Toate mașinile din sistem</span>
              </div>

              <div className="admin-stat-card">
                <p>Disponibile</p>
                <h3>{stats.available}</h3>
                <span>În stoc activ</span>
              </div>

              <div className="admin-stat-card">
                <p>Rezervate</p>
                <h3>{stats.reserved}</h3>
                <span>În așteptare</span>
              </div>

              <div className="admin-stat-card">
                <p>Vândute</p>
                <h3>{stats.sold}</h3>
                <span>Finalizate</span>
              </div>
            </section>

            <section className="admin-actions-grid">
              <div className="admin-panel-card">
                <div className="admin-panel-card-header">
                  <h3>Acțiuni rapide</h3>
                  <p>Administrează rapid stocul de mașini</p>
                </div>

                <div className="admin-action-buttons">
                  <Link to="/dashboard/add-car" className="primary-btn">
                    + Adaugă mașină
                  </Link>
                  <Link to="/dashboard/cars" className="secondary-btn">
                    Vezi toate mașinile
                  </Link>
                </div>
              </div>

              <div className="admin-panel-card">
                <div className="admin-panel-card-header">
                  <h3>Rezumat stoc</h3>
                  <p>Distribuția curentă a mașinilor</p>
                </div>

                <ul className="admin-activity-list">
                  <li>
                    <span className="dot available"></span>
                    Disponibile: {stats.available}
                  </li>
                  <li>
                    <span className="dot reserved"></span>
                    Rezervate: {stats.reserved}
                  </li>
                  <li>
                    <span className="dot sold"></span>
                    Vândute: {stats.sold}
                  </li>
                </ul>
              </div>
            </section>

            <section className="admin-panel-card">
              <div className="admin-panel-card-header">
                <h3>Mașini recente</h3>
                <p>Ultimele mașini adăugate în sistem</p>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Mașină</th>
                      <th>Preț</th>
                      <th>An</th>
                      <th>Status</th>
                      <th>Acțiune</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentCars.length === 0 ? (
                      <tr>
                        <td colSpan={5}>Nu există mașini în sistem.</td>
                      </tr>
                    ) : (
                      stats.recentCars.map((car) => (
                        <tr key={car._id}>
                          <td>{car.title}</td>
                          <td>{car.price} €</td>
                          <td>{car.year}</td>
                          <td>
                            <span className={`status-badge ${car.status}`}>
                              {car.status === "available" && "Disponibilă"}
                              {car.status === "reserved" && "Rezervată"}
                              {car.status === "sold" && "Vândută"}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/dashboard/edit-car/${car._id}`}
                              className="admin-car-edit-btn"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
