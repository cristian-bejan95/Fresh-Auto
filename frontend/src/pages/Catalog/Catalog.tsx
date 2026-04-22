import { useEffect, useState } from "react";
import { getCars } from "../../services/api";

export default function Catalog() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error("Eroare getCars:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Se încarcă...</p>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h1>Catalog Auto</h1>

      {cars.length === 0 && <p>Nu există mașini.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {cars.map((car) => (
          <div
            key={car._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <img
              src={
                car.images?.[0] ||
                "https://via.placeholder.com/400x250?text=No+Image"
              }
              alt={car.title}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 16 }}>
              <h3>{car.title}</h3>
              <p>
                <strong>Preț:</strong> {car.price} €
              </p>
              <p>
                <strong>Anul Fabricație:</strong> {car.year}
              </p>
              <p>
                <strong>Parcurs:</strong> {car.mileage}
              </p>
              <p>
                <strong>Combustibil:</strong> {car.fuel}
              </p>
              <p>
                <strong>Transmisie:</strong> {car.transmission}
              </p>
              <p>
                <strong>Tracțiune:</strong> {car.wheldrive}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
