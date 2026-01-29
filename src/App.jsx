import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Wrap everything in the Layout */}
      <Route element={<DashboardLayout />}>
        {/* Redirect empty path to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Page Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;