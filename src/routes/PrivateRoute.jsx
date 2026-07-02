import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function PrivateRoute({ children, allowedRoles }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  // nếu có giới hạn role mà role hiện tại không nằm trong đó
  if (allowedRoles && !allowedRoles.includes(authService.getRole())) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
