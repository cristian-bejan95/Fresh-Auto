import { useRef, useEffect, useState } from "react";
import { uploadImage } from "../../services/upload";
import { Link, useNavigate } from "react-router-dom";
import { createCar } from "../../services/api";
import "./AddCar.css";

type CarForm = {
  title: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  oldPrice: string;
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  color: string;
  wheldrive: string;
  description: string;
  images: string[];
  status: "available" | "reserved" | "sold" | "discount";
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
    oldPrice: "",
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

  useEffect(() => {
    document.title = "Adaugă mașină | Fresh-Auto Admin";
  }, []);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openSelect, setOpenSelect] = useState<string | null>(null);

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
      oldPrice: "",
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

    setFileNames([]);
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        brand: form.brand,
        model: form.model,
        year: Number(form.year),
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
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
                  <label>Titlu*</label>
                  <input
                    name="title"
                    placeholder="Ex: BMW X5 xDrive"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Brand*</label>
                  <input
                    name="brand"
                    placeholder="Ex: BMW"
                    value={form.brand}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Model*</label>
                  <input
                    name="model"
                    placeholder="Ex: X5"
                    value={form.model}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Anul Fabricație*</label>
                  <input
                    name="year"
                    type="number"
                    placeholder="Ex: 2018"
                    value={form.year}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Preț (€)*</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="Ex: 28900"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Parcurs*</label>
                  <input
                    name="mileage"
                    type="number"
                    placeholder="Ex: 105000"
                    value={form.mileage}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Combustibil*</label>
                  <input
                    name="fuel"
                    placeholder="Ex: Diesel"
                    value={form.fuel}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Transmisie*</label>
                  <input
                    name="transmission"
                    placeholder="Ex: Automată"
                    value={form.transmission}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Motor*</label>
                  <input
                    name="engine"
                    placeholder="Ex: 3.0L"
                    value={form.engine}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Putere*</label>
                  <input
                    name="power"
                    placeholder="Ex: 265 CP"
                    value={form.power}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Culoare*</label>
                  <input
                    name="color"
                    placeholder="Ex: Negru"
                    value={form.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Tracțiune*</label>
                  <input
                    name="wheldrive"
                    placeholder="Ex: 4x4"
                    value={form.wheldrive}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Preț Vechi (€)</label>
                  <input
                    name="oldPrice"
                    type="number"
                    placeholder="Ex: 35000"
                    value={form.oldPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-addcar-field">
                  <label>Status*</label>

                  <div className="select-wrapper">
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      onFocus={() => setOpenSelect("status")}
                      onBlur={() => setOpenSelect(null)}
                    >
                      <option value="available">Disponibilă</option>
                      <option value="reserved">Rezervată</option>
                      <option value="sold">Vândută</option>
                      <option value="discount">Reducere</option>
                    </select>

                    {/*  <span className="select-plus">
                      {openSelect === "status" ? "−" : "+"}
                    </span> */}
                  </div>
                </div>

                <div className="admin-addcar-field admin-addcar-field-full">
                  <label>Imagini*</label>

                  <div className="file-upload">
                    <label className="file-upload-label">
                      Alege imagini
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
                        ? `${fileNames.length} fișier(e) selectat(e)`
                        : "Nicio imagine selectată"}
                    </span>
                  </div>

                  {uploading && (
                    <p style={{ color: "#84b9ff", marginTop: "8px" }}>
                      Se încarcă imaginile...
                    </p>
                  )}
                </div>

                <div className="admin-addcar-field admin-addcar-field-full">
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

              <div className="admin-addcar-bottom-row">
                <label className="admin-addcar-checkbox">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  <span>Marchează ca Important</span>
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
                    disabled={loading || uploading}
                  >
                    {uploading
                      ? "Se încarcă imaginile..."
                      : loading
                        ? "Se salvează..."
                        : "Salvează mașina"}
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
              {form.images.length > 0 ? (
                <div className="preview-gallery">
                  {form.images.map((img, index) => (
                    <div className="preview-gallery-item" key={index}>
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="admin-addcar-preview-image"
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

              <div className="admin-addcar-preview-content">
                <h4>{form.title || "Titlul mașinii"}</h4>
                <p className="admin-addcar-preview-price">
                  {form.price ? `${form.price} €` : "0 €"}
                </p>

                <div className="admin-addcar-preview-meta">
                  <span>{form.year || "Anul Fabricație"}</span>
                  <span>{form.mileage || "Km"} km</span>
                  <span>{form.fuel || "Combustibil"}</span>
                </div>

                <div className="admin-addcar-preview-meta">
                  <span>{form.transmission || "Transmisie"}</span>
                  <span>{form.engine || "Motor"}</span>
                  <span>{form.power || "Putere"}</span>
                  <span>{form.wheldrive || "Tracțiune"}</span>
                </div>

                <div className="admin-addcar-preview-status-row">
                  <span className={`admin-addcar-status ${form.status}`}>
                    {form.status === "available" && "Disponibilă"}
                    {form.status === "reserved" && "Rezervată"}
                    {form.status === "sold" && "Vândută"}
                    {form.status === "discount" && "Reducere"}
                  </span>

                  {form.featured && (
                    <span className="admin-addcar-featured-badge">
                      Important
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
