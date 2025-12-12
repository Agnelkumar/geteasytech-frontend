import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowed, children }) => {
  const user = JSON.parse(localStorage.getItem("geteasytech_user"));

  if (!user) return <Navigate to="/" />;

  if (!allowed.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
