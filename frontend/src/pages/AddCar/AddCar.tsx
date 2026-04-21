import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCar } from "../../services/api";
import "./AddCar.css";

type CarForm = {
  title: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  color: string;
  description: string;
  image: string;
  status: "available" | "reserved" | "sold";
  featured: boolean;
};

export default function AddCar() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CarForm>({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuel: "",
    transmission: "",
    engine: "",
    power: "",
    color: "",
    description: "",
    image: "",
    status: "available",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuel: "",
      transmission: "",
      engine: "",
      power: "",
      color: "",
      description: "",
      image: "",
      status: "available",
      featured: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        brand: form.brand,
        model: form.model,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        fuel: form.fuel,
        transmission: form.transmission,
        engine: form.engine,
        power: form.power,
        color: form.color,
        description: form.description,
        images: form.image ? [form.image] : [],
        status: form.status,
        featured: form.featured,
      };

      await createCar(payload);
      setSuccess("Mașina a fost adăugată cu succes.");
      resetForm();
    } catch (err: any) {
      setError(err.message || "Eroare la adăugarea mașinii.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-addcar-page">
      <div className="admin-addcar-overlay" />

      <aside className="admin-addcar-sidebar">
        <div className="admin-addcar-logo">
          <h2>Fresh-Auto</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-addcar-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/add-car" className="active">
            Adaugă mașină
          </Link>
          <Link to="/dashboard/cars">Toate mașinile</Link>
          <Link to="/">Vezi site-ul</Link>
        </nav>

        <button className="admin-addcar-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-addcar-main">
        <header className="admin-addcar-topbar">
          <div>
            <p className="admin-addcar-topbar-label">Panou administrativ</p>
            <h1>Adaugă mașină</h1>
          </div>

          <div className="admin-addcar-user-box">
            <div className="admin-addcar-user-avatar">A</div>
            <div>
              <strong>Administrator</strong>
            </div>
          </div>
        </header>

        <div className="admin-addcar-content-grid">
          <section className="admin-addcar-form-card">
            <div className="admin-addcar-card-header">
              <h3>Date mașină</h3>
              <p>Completează toate informațiile pentru anunțul auto</p>
            </div>

            <form className="admin-addcar-form" onSubmit={handleSubmit}>
              <div className="admin-addcar-grid">
                <div className="admin-addcar-field">
                  <label>Titlu</label>
                  <input
                    name="title"
                    placeholder="Ex: BMW X5 xDrive"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Brand</label>
                  <input
                    name="brand"
                    placeholder="Ex: BMW"
                    value={form.brand}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Model</label>
                  <input
                    name="model"
                    placeholder="Ex: X5"
                    value={form.model}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>An</label>
                  <input
                    name="year"
                    type="number"
                    placeholder="Ex: 2018"
                    value={form.year}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Preț (€)</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="Ex: 28900"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Kilometri</label>
                  <input
                    name="mileage"
                    type="number"
                    placeholder="Ex: 146000"
                    value={form.mileage}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Combustibil</label>
                  <input
                    name="fuel"
                    placeholder="Ex: Diesel"
                    value={form.fuel}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Transmisie</label>
                  <input
                    name="transmission"
                    placeholder="Ex: Automată"
                    value={form.transmission}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Motor</label>
                  <input
                    name="engine"
                    placeholder="Ex: 3.0"
                    value={form.engine}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Putere</label>
                  <input
                    name="power"
                    placeholder="Ex: 265 CP"
                    value={form.power}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Culoare</label>
                  <input
                    name="color"
                    placeholder="Ex: Negru"
                    value={form.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="available">Disponibilă</option>
                    <option value="reserved">Rezervată</option>
                    <option value="sold">Vândută</option>
                  </select>
                </div>

                <div className="admin-addcar-field admin-addcar-field-full">
                  <label>Link imagine</label>
                  <input
                    name="image"
                    placeholder="https://..."
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field admin-addcar-field-full">
                  <label>Descriere</label>
                  <textarea
                    name="description"
                    placeholder="Descriere completă a mașinii..."
                    value={form.description}
                    onChange={handleChange}
                    rows={6}
                  />
                </div>
              </div>

              <div className="admin-addcar-bottom-row">
                <label className="admin-addcar-checkbox">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  <span>Marchează ca Featured</span>
                </label>

                <div className="admin-addcar-actions">
                  <button
                    type="button"
                    className="admin-addcar-secondary-btn"
                    onClick={resetForm}
                  >
                    Resetează
                  </button>

                  <button
                    type="submit"
                    className="admin-addcar-primary-btn"
                    disabled={loading}
                  >
                    {loading ? "Se salvează..." : "Salvează mașina"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="admin-addcar-message error">{error}</div>
              )}
              {success && (
                <div className="admin-addcar-message success">{success}</div>
              )}
            </form>
          </section>

          <section className="admin-addcar-preview-card">
            <div className="admin-addcar-card-header">
              <h3>Preview</h3>
              <p>Așa va arăta mașina în catalog</p>
            </div>

            <div className="admin-addcar-preview-box">
              <img
                src={
                  form.image?.trim()
                    ? form.image
                    : "https://via.placeholder.com/600x380?text=Auto+Preview"
                }
                alt={form.title || "Preview mașină"}
                className="admin-addcar-preview-image"
              />

              <div className="admin-addcar-preview-content">
                <h4>{form.title || "Titlul mașinii"}</h4>
                <p className="admin-addcar-preview-price">
                  {form.price ? `${form.price} €` : "0 €"}
                </p>

                <div className="admin-addcar-preview-meta">
                  <span>{form.year || "An"}</span>
                  <span>{form.mileage || "Km"} km</span>
                  <span>{form.fuel || "Combustibil"}</span>
                </div>

                <div className="admin-addcar-preview-meta">
                  <span>{form.transmission || "Transmisie"}</span>
                  <span>{form.engine || "Motor"}</span>
                  <span>{form.power || "Putere"}</span>
                </div>

                <div className="admin-addcar-preview-status-row">
                  <span className={`admin-addcar-status ${form.status}`}>
                    {form.status === "available" && "Disponibilă"}
                    {form.status === "reserved" && "Rezervată"}
                    {form.status === "sold" && "Vândută"}
                  </span>

                  {form.featured && (
                    <span className="admin-addcar-featured-badge">
                      Featured
                    </span>
                  )}
                </div>

                <p className="admin-addcar-preview-description">
                  {form.description || "Descrierea mașinii va apărea aici."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
