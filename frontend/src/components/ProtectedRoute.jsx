import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../loading/Loading.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    console.log("User not authenticated, redirecting...");
    return <Navigate to="/" replace />;
  }

  return children;
};

const HomeRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (user) {
    console.log("Already logged in, redirecting...");
    return <Navigate to="/home" replace />;
  }
  return children;
};

export { ProtectedRoute, HomeRoute };
