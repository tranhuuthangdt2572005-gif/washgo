import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import CustomerDashboard from "../pages/customer/Dashboard";
import ReceptionistDashboard from "../pages/receptionist/Dashboard";
import WasherDashboard from "../pages/washer/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/customer"
          element={
            <PrivateRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/receptionist"
          element={
            <PrivateRoute allowedRoles={["RECEPTIONIST"]}>
              <ReceptionistDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/washer"
          element={
            <PrivateRoute allowedRoles={["WASHER"]}>
              <WasherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
