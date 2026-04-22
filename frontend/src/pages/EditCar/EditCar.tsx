import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCarById, updateCar } from "../../services/api";
import { uploadImage } from "../../services/upload";
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
  wheldrive: string;
  description: string;
  images: string[];
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
    wheldrive: "",
    description: "",
    images: [],
    status: "available",
    featured: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = "Editare mașină | Fresh-Auto Admin";
  }, []);

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
          wheldrive: car.wheldrive || "",
          description: car.description || "",
          images: car.images || [],
          status: car.status || "available",
          featured: !!car.featured,
        });

        setFileNames([]);
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

  const removeImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));

    setFileNames((prev) => prev.filter((_, index) => index !== indexToRemove));

    if (fileInputRef.current && form.images.length === 1) {
      fileInputRef.current.value = "";
    }
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
        wheldrive: form.wheldrive,
        description: form.description,
        images: form.images,
        status: form.status,
        featured: form.featured,
      };

      await updateCar(id, payload);
      setSuccess("Mașina a fost actualizată cu succes.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFileNames([]);
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
          <h2>Fresh-Auto</h2>
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
                    <label>Titlu*</label>
                    <input
                      name="title"
                      placeholder="Ex: BMW X5 xDrive"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Brand*</label>
                    <input
                      name="brand"
                      placeholder="Ex: BMW"
                      value={form.brand}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Model*</label>
                    <input
                      name="model"
                      placeholder="Ex: X5"
                      value={form.model}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Anul Fabricație*</label>
                    <input
                      name="year"
                      type="number"
                      placeholder="Ex: 2018"
                      value={form.year}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Preț (€)*</label>
                    <input
                      name="price"
                      type="number"
                      placeholder="Ex: 28900"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Parcurs*</label>
                    <input
                      name="mileage"
                      type="number"
                      placeholder="Ex: 146000"
                      value={form.mileage}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Combustibil*</label>
                    <input
                      name="fuel"
                      placeholder="Ex: Diesel"
                      value={form.fuel}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Transmisie*</label>
                    <input
                      name="transmission"
                      placeholder="Ex: Automată"
                      value={form.transmission}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Motor*</label>
                    <input
                      name="engine"
                      placeholder="Ex: 3.0"
                      value={form.engine}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Putere*</label>
                    <input
                      name="power"
                      placeholder="Ex: 265 CP"
                      value={form.power}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Culoare*</label>
                    <input
                      name="color"
                      placeholder="Ex: Negru"
                      value={form.color}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Tracțiune*</label>
                    <input
                      name="wheldrive"
                      placeholder="Ex: 4x4"
                      value={form.wheldrive}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-editcar-field">
                    <label>Status*</label>
                    <div className="select-wrapper">
                      <select
                        name="status"
                        value={form.status}
                        onChange={(e) => {
                          handleChange(e);
                          setIsOpen(false);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                      >
                        <option value="available">Disponibilă</option>
                        <option value="reserved">Rezervată</option>
                        <option value="sold">Vândută</option>
                      </select>

                      <span className={`select-arrow ${isOpen ? "open" : ""}`}>
                        <svg viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="admin-editcar-field admin-editcar-field-full">
                    <label>Imagini*</label>

                    <div className="file-upload">
                      <label className="file-upload-label">
                        Adaugă imagini
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={async (e) => {
                            const files = e.target.files;
                            if (!files || files.length === 0) return;

                            try {
                              setUploading(true);
                              setError("");
                              setSuccess("");

                              const filesArray = Array.from(files);

                              const uploadedUrls = await Promise.all(
                                filesArray.map((file) => uploadImage(file)),
                              );

                              setForm((prev) => ({
                                ...prev,
                                images: [...prev.images, ...uploadedUrls],
                              }));

                              setFileNames((prev) => [
                                ...prev,
                                ...filesArray.map((file) => file.name),
                              ]);

                              setSuccess(
                                "Imaginile au fost încărcate cu succes.",
                              );
                            } catch (err: any) {
                              setError(
                                err.message || "Eroare la upload imagini.",
                              );
                            } finally {
                              setUploading(false);

                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }
                          }}
                        />
                      </label>

                      <span className="file-upload-name">
                        {fileNames.length > 0
                          ? `${fileNames.length} fișier(e) noi selectat(e)`
                          : "Poți adăuga imagini noi"}
                      </span>
                    </div>

                    {uploading && (
                      <p style={{ color: "#84b9ff", marginTop: "8px" }}>
                        Se încarcă imaginile...
                      </p>
                    )}
                  </div>

                  <div className="admin-editcar-field admin-editcar-field-full">
                    <label>Descriere Auto*</label>
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
                      to="/dashboard/cars"
                      className="admin-editcar-secondary-btn link-btn"
                    >
                      Înapoi la listă
                    </Link>

                    <button
                      type="submit"
                      className="admin-editcar-primary-btn"
                      disabled={saving || uploading}
                    >
                      {uploading
                        ? "Se încarcă imaginile..."
                        : saving
                          ? "Se salvează..."
                          : "Salvează modificările"}
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
                {form.images.length > 0 ? (
                  <div className="preview-gallery">
                    {form.images.map((img, index) => (
                      <div className="preview-gallery-item" key={index}>
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="admin-editcar-preview-image"
                        />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                        >
                          Șterge
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-preview">
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "18px", marginBottom: "6px" }}>
                        Fără imagini
                      </p>
                      <span style={{ fontSize: "13px", opacity: 0.7 }}>
                        Încarcă una sau mai multe imagini pentru preview
                      </span>
                    </div>
                  </div>
                )}

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
                    <span>{form.wheldrive || "Tracțiune"}</span>
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
