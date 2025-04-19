import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../loading/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
