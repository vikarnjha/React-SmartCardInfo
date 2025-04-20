import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardForm from "./components/CardForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Auth from "./components/Auth";
import Cards from "./components/Cards"
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div className="flex flex-col h-dvh">
                <Navbar />
                <div className="flex-1 h-full">
                  <CardForm />
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <div className="flex flex-col h-dvh">
                <Navbar />
                <div className="flex-1 h-full">
                  <Cards />
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div className="flex flex-col h-dvh">
                <Navbar />
                <Profile />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <div className="flex flex-col h-dvh">
                <Navbar />
                <div className="flex-1 h-full">
                  <Contact />
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
