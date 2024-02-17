import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUTS
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import LayoutDefault from "./layouts/Default";

// PAGES ADMIN
import AdminLogin from "./pages/admin/Login";
import DataMobil from "./pages/admin/data-mobil/Index";
import DataTransaction from "./pages/admin/data-transaksi/Index";
import DataPengguna from "./pages/admin/data-pengguna/Index";

// PAGES CUSTOMER
import Home from "./pages/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD */}
        <Route Component={LayoutDashboard}>
          <Route index path="/admin/data-mobil" Component={DataMobil} />
          <Route
            index
            path="/admin/data-transaksi"
            Component={DataTransaction}
          />
          <Route index path="/admin/data-pengguna" Component={DataPengguna} />
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
