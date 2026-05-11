import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AddCar from "./pages/AddCar/AddCar";
import Home from "./pages/Home/Home";
import Tradein from "./pages/Tradein/Tradein";
import Catalog from "./pages/Catalog/Catalog";
import Promotii from "./pages/Promotii/Promotii";
import Leasing from "./pages/Credit/Credit";
import Contacts from "./pages/Contacts/Contacts";
import Favorite from "./pages/Favorite/Favorite";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCarsList from "./pages/AdminCarsList/AdminCarsList";
import EditCar from "./pages/EditCar/EditCar";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import CarDetails from "./pages/CarDetails/CarDetails";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function AppContent() {
  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin-login");

  return (
    <div className="site-wrapper">
      {!isDashboard && <Header />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/trade-in" element={<Tradein />} />
          <Route path="/leasing" element={<Leasing />} />
          <Route path="/promotii" element={<Promotii />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/cars/:id" element={<CarDetails />} />

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
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
