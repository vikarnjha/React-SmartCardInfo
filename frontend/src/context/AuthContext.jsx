import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the user info
  const [loading, setLoading] = useState(true); // Loading flag

  // Verify user on page load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("https://react-smartcardinfo.onrender.com/api/auth/verify", {
          withCredentials: true, // Send cookies
        });
        setUser(res.data.user); // Set user from backend response
      } catch (error) {
        setUser(null); // Not logged in or invalid token
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
