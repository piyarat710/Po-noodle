import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("staffLogin") === "true";

  if (!isLogin) {
    return <Navigate to="/staff-login" replace />;
  }

  return children;
}
