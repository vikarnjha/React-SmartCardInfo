// src/components/AboutUs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const handleContact = () => navigate("/contact");
  const handleHome = () => navigate("/home");

  return (
    <div className="w-full my-auto max-w-3xl bg-gray-900 bg-opacity-75 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center">
        About Smart Card Manager
      </h2>

      <div className="space-y-4 text-gray-300">
        <p>
          Smart Card Manager is your go-to application for securely storing,
          managing, and viewing your payment card details. Built with React and
          MongoDB, our platform ensures your sensitive information stays private
          and encrypted.
        </p>
        <p>
          Our mission is to provide a seamless, intuitive interface for all your
          card management needs—whether you’re saving a new card, tracking
          expiry dates, or just keeping your CVVs handy.
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
        About the Developer
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed">
        This project was conceived and developed by <strong>Vikarn Jha</strong>.
        As a full‑stack enthusiast, I built Smart Card Manager from scratch using
        React on the frontend and MongoDB/Node.js on the backend. I handled
        everything from UI design with Tailwind CSS to secure authentication,
        card encryption, and email notifications.
      </p>

      <p className="text-gray-300 mb-6">
        I’m always looking to improve. If you have questions, feedback, or just
        want to say hello, feel free to{" "}
        <span
          onClick={handleContact}
          className="text-indigo-400 hover:text-indigo-200 cursor-pointer"
        >
          Contact Us
        </span>
        .
      </p>

      <div className="text-center">
        <button
          onClick={handleHome}
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-2xl transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
