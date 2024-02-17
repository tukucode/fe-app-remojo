import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUTS
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";

// PAGES
import Home from "./pages/Index";
import Admin from "./pages/admin/Index";

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

        {/* PAGE NOT FOUND */}
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
