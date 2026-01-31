import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Login from "./pages/Login"; // Make sure to import your new Login page
import ProtectedRoute from "./components/ProtectedRoute"; // Your new guard

function App() {
  return (
    <Routes>
      {/* 1. Public Route: Login is outside the layout */}
      <Route path="/login" element={<Login />} />

      {/* 2. Protected Routes: Everything inside is guarded */}
      <Route element={<ProtectedRoute />}>
        {/* 3. Layout Wrapper: Only shows for logged-in users */}
        <Route element={<DashboardLayout />}>
          
          {/* Redirect empty path to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Page Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          
        </Route>
      </Route>

      {/* 4. Catch-all: If route doesn't exist, go to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;