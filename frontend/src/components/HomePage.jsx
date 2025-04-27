import React from "react";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl w-full shadow-2xl rounded-2xl p-8 bg-gray-900 bg-opacity-75 text-white">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Smart Card Manager
        </h1>

        <p className="text-lg text-gray-300 mb-6 text-center">
          Smart Card Manager helps you securely store, manage, and access your
          credit and debit card information — all in one place.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            App Features
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Securely save multiple credit and debit cards</li>
            <li>
              Automatic card type detection (Visa, Mastercard, Rupay, Amex,
              Diners, Discover, JCB, etc.)
            </li>
            <li>Card number encryption for enhanced security</li>
            <li>Access and manage your cards anytime</li>
            <li>Option to delete cards at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            Why We Collect Your Data
          </h2>
          <p className="text-gray-300">
            We collect and securely store your card information solely for the
            purpose of allowing you to manage and retrieve your cards easily
            within the app. We do not share or sell your data to third parties.
            Your security and privacy are our top priorities.
          </p>
        </section>

        <div className="text-center">
          <a
            href="https://react-smart-card-info.vercel.app/policy"
            className="text-blue-500 text-lg font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Our Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
