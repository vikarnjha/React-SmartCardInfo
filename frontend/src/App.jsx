import {} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardForm from "./components/CardForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Auth from "./components/Auth";

import "./App.css";

function App() {
  return (
    <>
      {/* <Home/> */}

      <BrowserRouter>
        {/* Auth page rouge */}
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>

        <Routes>
          {/* Homepage route  */}
          <Route
            path="/home"
            element={
              <div className="flex flex-col h-dvh">
                <div>
                  <Navbar />
                </div>
                <div className="flex-1 h-full">
                  <CardForm />
                </div>
                <div>
                  <Footer />
                </div>
              </div>
            }
          />
          {/* Profile page route  */}
          <Route
            path="/profile"
            element={
              <div className="flex flex-col h-dvh">
                <div>
                  <Navbar />
                </div>
                <div>
                  <Profile />
                </div>
                <div>
                  <Footer />
                </div>
              </div>
            }
          />
          {/* Contact page route  */}
          <Route
            path="/contact"
            element={
              <div className="flex flex-col h-dvh">
                <div>
                  <Navbar />
                </div>
                <div className="flex-1 h-full">
                  <Contact />
                </div>
                <div>
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
