import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// LAYOUTS
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import LayoutDefault from "./layouts/Default";

// ====== PAGES AUTHENTICATION =========
import AdminLogin from "./pages/admin/Login";
import CustomerLogin from "./pages/Login";
import CustomerRegister from "./pages/admin/Register";

// DATA MOBIL
import DataMobil from "./pages/admin/data-mobil/Index";
import BuatBaru from "./pages/admin/data-mobil/buat-baru";
import DataMobilEdit from "./pages/admin/data-mobil/Edit";

// DATA TRANSAKSI
import DataTransaction from "./pages/admin/data-transaksi/Index";
import DataTransaksiDetail from "./pages/admin/data-transaksi/Detail";

// DATA PENGGUNA
import DataPengguna from "./pages/admin/data-pengguna/Index";
import DataPenggunaDetail from "./pages/admin/data-pengguna/Detail";

// ====== PAGES CUSTOMER =========
import Beranda from "./pages/Beranda";
import RentalMobil from "./pages/rental-mobil/Index";
import RentalMobilCheckout from "./pages/rental-mobil/Checkout";
import DaftarSewa from "./pages/daftar-sewa/Index";
import ProfileCustomer from "./pages/profile/Index";

// ====== NEGATIVE PAGE =========
import Nofound from "./pages/Notfound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD */}
        <Route path="admin" Component={LayoutDashboard}>
          <Route path="data-mobil">
            <Route index Component={DataMobil} />
            <Route path="buat-baru" Component={BuatBaru} />
            <Route path="edit/:product_id" Component={DataMobilEdit} />
          </Route>

          <Route path="data-transaksi">
            <Route index Component={DataTransaction} />
            <Route
              path="detail/:transaction_id"
              Component={DataTransaksiDetail}
            />
          </Route>

          <Route path="data-pengguna">
            <Route index Component={DataPengguna} />
            <Route path="detail/:user_id" Component={DataPenggunaDetail} />
          </Route>
        </Route>

        {/* LANDING */}
        <Route Component={LayoutLanding}>
          <Route index path="/beranda" Component={Beranda} />

          <Route path="rental-mobil">
            <Route index Component={RentalMobil} />
            <Route
              path="checkout/:product_id"
              Component={RentalMobilCheckout}
            />
          </Route>

          <Route path="/daftar-sewa" Component={DaftarSewa} />
          <Route path="/profile" Component={ProfileCustomer} />
        </Route>

        {/* DEFAULT */}
        <Route Component={LayoutDefault}>
          <Route path="/admin/login" Component={AdminLogin} />
          <Route path="/login" Component={CustomerLogin} />
          <Route path="/register" Component={CustomerRegister} />

          <Route path="/*" element={<Navigate to="/404" replace />} />
          <Route path="/404" Component={Nofound} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
