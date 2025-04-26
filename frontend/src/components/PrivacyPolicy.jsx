import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
      const navigate = useNavigate();
      const handleContact = () => navigate("/contact");
  return (
    <>
      <div className="w-full my-5 max-w-3xl bg-gray-900 bg-opacity-75 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-400">Privacy Policy</h1>

        <p className="mb-6 text-gray-300">
          <strong>Effective Date:</strong> April 11, 2025
        </p>

        <p className="mb-6 text-gray-300">
          Welcome to <span className="font-semibold">Smart Card Manager</span>{" "}
          ("we," "our," or "us"). Your privacy is important to us. This Privacy
          Policy explains how we collect, use, protect, and handle your
          information when you use our application.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>
            Payment Card Details: Securely encrypted card number, cardholder
            name, expiry date, and CVV.
          </li>
          <li>User Credentials: Email address and hashed password.</li>
          <li>
            Device Information: Browser type, device model, and IP address.
          </li>
          <li>
            Communication Information: Your contact details and messages when
            you reach out to us.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          How We Use Your Information
        </h2>
        <p className="mb-6 text-gray-300">
          We use your information to securely store and manage your payment
          cards, authenticate your login, send notifications, and respond to
          your inquiries. We do <span className="font-semibold">not</span> sell,
          rent, or trade your personal information.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          How We Protect Your Information
        </h2>
        <p className="mb-6 text-gray-300">
          We implement strong security measures, including encryption, hashed
          passwords, token-based authentication, and secure cloud storage.
          However, no method of transmission or storage is 100% secure. We
          encourage you to use strong passwords and keep your login information
          safe.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          Your Rights and Choices
        </h2>
        <p className="mb-6 text-gray-300">
          You have the right to access, update, or request deletion of your
          information. Please contact us at{" "}
          <a
            href="mailto:[vpainfotech@gmail.com]"
            className="text-blue-600 underline"
          >
            [vpainfotech@gmail.com]
          </a>{" "}
          to exercise your rights.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          Third-Party Services
        </h2>
        <p className="mb-6 text-gray-300">
          We may use trusted third-party services (e.g., email providers) to
          operate Smart Card Info. These services maintain their own privacy
          practices which we ensure are secure and reliable.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          Changes to This Policy
        </h2>
        <p className="mb-6 text-gray-300">
          We may update this Privacy Policy as needed. Changes will be posted
          here with an updated effective date. Please review it periodically.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
        <p className="mb-6 text-gray-300">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          
            <button className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-2xl transition cursor-pointer" onClick={handleContact}>Contact Us</button>
        </ul>
      </div>
    </>
  );
};

export default PrivacyPolicy;
