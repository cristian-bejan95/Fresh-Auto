import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AddCar from "./pages/AddCar/AddCar";
import Catalog from "./pages/Catalog/Catalog";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCarsList from "./pages/AdminCarsList/AdminCarsList";
import EditCar from "./pages/EditCar/EditCar";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/cars"
          element={
            <ProtectedRoute>
              <AdminCarsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/edit-car/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
