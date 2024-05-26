import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUTS
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import LayoutDefault from "./layouts/Default";

// ====== PAGES ADMIN =========
import AdminLogin from "./pages/admin/Login";
// DATA MOBIL
import DataMobil from "./pages/admin/data-mobil/Index";
import BuatBaru from "./pages/admin/data-mobil/buat-baru";
import DataMobilEdit from "./pages/admin/data-mobil/Edit";

// DATA TRANSAKSI
import DataTransaction from "./pages/admin/data-transaksi/Index";
import DataTransaksiDetail from "./pages/admin/data-transaksi/Detail";

import DataPengguna from "./pages/admin/data-pengguna/Index";

// ====== PAGES CUSTOMER =========
import Home from "./pages/Index";

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
            <Route path="detail/:transaction_id" Component={DataTransaksiDetail} />
          </Route>


          <Route path="data-pengguna" Component={DataPengguna} />
        </Route>

        {/* LANDING */}
        <Route Component={LayoutLanding}>
          <Route index path="/" Component={Home} />
        </Route>

        {/* DEFAULT */}
        <Route Component={LayoutDefault}>
          <Route path="/admin/login" Component={AdminLogin} />

          <Route path="/*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
