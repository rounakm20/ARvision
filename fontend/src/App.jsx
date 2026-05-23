import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Detail from "./pages/Detail";
import Catalog from "./pages/Catalog";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/scanner"           element={<Scanner />} />
        <Route path="/detail/:id"        element={<Detail />} />
        <Route path="/catalog"           element={<Catalog />} />
        <Route path="/admin"             element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}