import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AddCar from "./pages/AddCar/AddCar";
import Home from "./pages/Home/Home";
import Tradein from "./pages/Tradein/Tradein";
import Catalog from "./pages/Catalog/Catalog";
import Leasing from "./pages/Credit/Credit";
import Contacts from "./pages/Contacts/Contacts";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCarsList from "./pages/AdminCarsList/AdminCarsList";
import EditCar from "./pages/EditCar/EditCar";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import CarDetails from "./pages/CarDetails/CarDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/trade-in" element={<Tradein />} />
        <Route path="/leasing" element={<Leasing />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/cars/:id" element={<CarDetails />} />
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
