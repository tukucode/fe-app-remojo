import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUTS
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";

// PAGES ADMIN
import Admin from "./pages/admin/Index";
import AdminLogin from "./pages/admin/Login";

// PAGES CUSTOMER
import Home from "./pages/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD */}
        <Route Component={LayoutDashboard}>
          <Route index path="/admin" element={<Admin />} />
        </Route>

        {/* LANDING */}
        <Route Component={LayoutLanding}>
          <Route index path="/" Component={Home} />
        </Route>

        {/* AUTH */}
        <Route path="/admin/login" Component={AdminLogin} />

        {/* PAGE NOT FOUND */}
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
