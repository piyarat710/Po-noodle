import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("isStaff") === "true";

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
