import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardForm from "./components/CardForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Auth from "./components/Auth";
import SavedCards from "./components/SavedCards";
import { ProtectedRoute, HomeRoute } from "./components/ProtectedRoute";
import AboutUs from "./components/AboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/homepage" element={<HomePage />} />"{/* Public Route */}
        <Route
          path="/"
          element={
            <HomeRoute>
              <div className="flex flex-col h-dvh">
                <Navbar />
                <Auth />
                <Footer />
              </div>
            </HomeRoute>
          }
        />
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
              <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <Navbar />
                <div className="flex flex-wrap justify-center gap-5 mt-5 mb-5 flex-grow">
                  <SavedCards />
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
          path="/about"
          element={
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
              <Navbar />
              <div className="flex flex-wrap justify-center flex-grow">
                <AboutUs />
              </div>
              <Footer />
            </div>
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
        <Route
          path="/policy"
          element={
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
              <Navbar />
              <div className="flex flex-wrap justify-center flex-grow">
                <PrivacyPolicy />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
