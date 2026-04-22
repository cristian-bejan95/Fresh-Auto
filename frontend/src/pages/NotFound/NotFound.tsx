import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#07192b",
        color: "#fff",
        padding: 20,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 64, marginBottom: 10 }}>404</h1>
        <p style={{ fontSize: 20, marginBottom: 20 }}>
          Pagina nu a fost găsită
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            borderRadius: 12,
            textDecoration: "none",
            background: "#3b57ff",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Înapoi la site
        </Link>
      </div>
    </div>
  );
}
