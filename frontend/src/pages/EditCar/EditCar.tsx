import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCarById, updateCar } from "../../services/api";
import "./EditCar.css";

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

export default function EditCar() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("ID-ul mașinii lipsește");
        }

        const car = await getCarById(id);

        setForm({
          title: car.title || "",
          brand: car.brand || "",
          model: car.model || "",
          year: car.year ? String(car.year) : "",
          price: car.price ? String(car.price) : "",
          mileage: car.mileage ? String(car.mileage) : "",
          fuel: car.fuel || "",
          transmission: car.transmission || "",
          engine: car.engine || "",
          power: car.power || "",
          color: car.color || "",
          description: car.description || "",
          image: car.images?.[0] || "",
          status: car.status || "available",
          featured: !!car.featured,
        });
      } catch (err: any) {
        setError(err.message || "Eroare la încărcarea mașinii");
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      if (!id) {
        throw new Error("ID-ul mașinii lipsește");
      }

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

      await updateCar(id, payload);
      setSuccess("Mașina a fost actualizată cu succes.");
    } catch (err: any) {
      setError(err.message || "Eroare la actualizarea mașinii.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-editcar-page">
      <div className="admin-editcar-overlay" />

      <aside className="admin-editcar-sidebar">
        <div className="admin-editcar-logo">
          <h2>AutoPark</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-editcar-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/add-car">Adaugă mașină</Link>
          <Link to="/dashboard/cars" className="active">
            Toate mașinile
          </Link>
          <Link to="/">Vezi site-ul</Link>
        </nav>

        <button className="admin-editcar-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-editcar-main">
        <header className="admin-editcar-topbar">
          <div>
            <p className="admin-editcar-topbar-label">Panou administrativ</p>
            <h1>Editare mașină</h1>
          </div>

          <div className="admin-editcar-user-box">
            <div className="admin-editcar-user-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <p>admin@parcauto.md</p>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="admin-editcar-loading-card">
            <p>Se încarcă datele mașinii...</p>
          </div>
        ) : (
          <div className="admin-editcar-content-grid">
            <section className="admin-editcar-form-card">
              <div className="admin-editcar-card-header">
                <h3>Actualizează datele</h3>
                <p>Modifică informațiile mașinii și salvează schimbările</p>
              </div>

              <form className="admin-editcar-form" onSubmit={handleSubmit}>
                <div className="admin-editcar-grid">
                  <div className="admin-editcar-field">
                    <label>Titlu</label>
                    <input
                      name="title"
                      placeholder="Ex: BMW X5 xDrive"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Brand</label>
                    <input
                      name="brand"
                      placeholder="Ex: BMW"
                      value={form.brand}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Model</label>
                    <input
                      name="model"
                      placeholder="Ex: X5"
                      value={form.model}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>An</label>
                    <input
                      name="year"
                      type="number"
                      placeholder="Ex: 2018"
                      value={form.year}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Preț (€)</label>
                    <input
                      name="price"
                      type="number"
                      placeholder="Ex: 28900"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Kilometri</label>
                    <input
                      name="mileage"
                      type="number"
                      placeholder="Ex: 146000"
                      value={form.mileage}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Combustibil</label>
                    <input
                      name="fuel"
                      placeholder="Ex: Diesel"
                      value={form.fuel}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Transmisie</label>
                    <input
                      name="transmission"
                      placeholder="Ex: Automată"
                      value={form.transmission}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Motor</label>
                    <input
                      name="engine"
                      placeholder="Ex: 3.0"
                      value={form.engine}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Putere</label>
                    <input
                      name="power"
                      placeholder="Ex: 265 CP"
                      value={form.power}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Culoare</label>
                    <input
                      name="color"
                      placeholder="Ex: Negru"
                      value={form.color}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
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

                  <div className="admin-editcar-field admin-editcar-field-full">
                    <label>Link imagine</label>
                    <input
                      name="image"
                      placeholder="https://..."
                      value={form.image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field admin-editcar-field-full">
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

                <div className="admin-editcar-bottom-row">
                  <label className="admin-editcar-checkbox">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                    />
                    <span>Marchează ca Featured</span>
                  </label>

                  <div className="admin-editcar-actions">
                    <Link
                      to="/admin/cars"
                      className="admin-editcar-secondary-btn link-btn"
                    >
                      Înapoi la listă
                    </Link>

                    <button
                      type="submit"
                      className="admin-editcar-primary-btn"
                      disabled={saving}
                    >
                      {saving ? "Se salvează..." : "Salvează modificările"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="admin-editcar-message error">{error}</div>
                )}
                {success && (
                  <div className="admin-editcar-message success">{success}</div>
                )}
              </form>
            </section>

            <section className="admin-editcar-preview-card">
              <div className="admin-editcar-card-header">
                <h3>Preview actualizat</h3>
                <p>Așa va arăta mașina în catalog după salvare</p>
              </div>

              <div className="admin-editcar-preview-box">
                <img
                  src={
                    form.image?.trim()
                      ? form.image
                      : "https://via.placeholder.com/600x380?text=Auto+Preview"
                  }
                  alt={form.title || "Preview mașină"}
                  className="admin-editcar-preview-image"
                />

                <div className="admin-editcar-preview-content">
                  <h4>{form.title || "Titlul mașinii"}</h4>
                  <p className="admin-editcar-preview-price">
                    {form.price ? `${form.price} €` : "0 €"}
                  </p>

                  <div className="admin-editcar-preview-meta">
                    <span>{form.year || "An"}</span>
                    <span>{form.mileage || "Km"} km</span>
                    <span>{form.fuel || "Combustibil"}</span>
                  </div>

                  <div className="admin-editcar-preview-meta">
                    <span>{form.transmission || "Transmisie"}</span>
                    <span>{form.engine || "Motor"}</span>
                    <span>{form.power || "Putere"}</span>
                  </div>

                  <div className="admin-editcar-preview-status-row">
                    <span className={`admin-editcar-status ${form.status}`}>
                      {form.status === "available" && "Disponibilă"}
                      {form.status === "reserved" && "Rezervată"}
                      {form.status === "sold" && "Vândută"}
                    </span>

                    {form.featured && (
                      <span className="admin-editcar-featured-badge">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="admin-editcar-preview-description">
                    {form.description || "Descrierea mașinii va apărea aici."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
