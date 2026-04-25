const API_URL = "http://localhost:5000";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Eroare la login");
  }

  return result;
}

export async function createCar(data: any) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Eroare la adăugarea mașinii");
  }

  return result;
}

export async function getCars(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";

  const res = await fetch(`${API_URL}/api/cars${query}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Eroare la încărcarea mașinilor");
  }

  return data;
}

export async function getCarById(id: string) {
  const res = await fetch(`${API_URL}/api/cars/${id}`);
  return res.json();
}

export async function updateCar(id: string, data: any) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Eroare la actualizare");
  }

  return result;
}

export async function deleteCar(id: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Eroare la ștergere");
  }

  return result;
}

export async function getCarStats() {
  const res = await fetch(`${API_URL}/api/cars/stats`);
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Eroare la încărcarea statisticilor");
  }

  return result;
}
