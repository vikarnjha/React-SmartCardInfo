import React, { useState } from "react";
import {
  visa,
  mastercard,
  rupay,
  amex,
  diners,
  discover,
  jcb,
} from "../config/cardIcons";

const cardConfig = {
  visa: { icon: visa, color: "#2563EB" },            // Tailwind blue-600
  mastercard: { icon: mastercard, color: "#F97316" }, // Tailwind orange-500
  rupay: { icon: rupay, color: "#10B981" },           // Tailwind emerald-500
  "american express": { icon: amex, color: "#6366F1" }, // Tailwind indigo-500
  "diners club": { icon: diners, color: "#EC4899" },    // Tailwind pink-500
  discover: { icon: discover, color: "#F59E0B" },       // Tailwind amber-500
  jcb: { icon: jcb, color: "#8B5CF6" },                 // Tailwind violet-500
};


const cardNumbers = [
  { number: "4111 1111 1111 1111" },
  { number: "5555 5555 5555 4444" },
  { number: "6521 1234 5678 9012" },
  { number: "3782 822463 10005" },
  { number: "3610 102025 5904" },
  { number: "6011 0009 9013 9424" },
  { number: "3530 1113 3330 0000" },
];

function CardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpire, setCardExpire] = useState("");
  const [cardSecurity, setCardSecurity] = useState("");
  const [apiError, setApiError] = useState("");

  const generateRandomCard = () => {
    const random = cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
    setCardNumber(random.number);
    detectCardTypeFromAPI(random.number);
    handleCardNumberChange({ target: { value: random.number } });
  };

  const handleCardNumberChange = async (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");

    // Format the number
    let formattedValue = "";

    if (rawValue.length === 14) {
      // Diners Club: 4-6-4
      formattedValue = rawValue.replace(
        /^(\d{0,4})(\d{0,6})?(\d{0,4})?/,
        (_, g1, g2, g3) => [g1, g2, g3].filter(Boolean).join(" ")
      );
    } else if (rawValue.length === 15) {
      // American Express: 4-6-5
      formattedValue = rawValue.replace(
        /^(\d{0,4})(\d{0,6})?(\d{0,5})?/,
        (_, g1, g2, g3) => [g1, g2, g3].filter(Boolean).join(" ")
      );
    } else {
      // Default (Visa, MasterCard, etc.): 4-4-4-4
      formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }

    setCardNumber(formattedValue);

    // Detect card type
    if (rawValue.length >= 6) {
      const detectedType = await detectCardTypeFromAPI(rawValue);
      if (detectedType) {
        setCardType(detectedType.toLowerCase());
      } else {
        setCardType("");
      }
    } else {
      setCardType("");
    }
  };

  const detectCardTypeFromAPI = async (cardNumber) => {
    const bin = cardNumber.replace(/\D/g, "").slice(0, 6);
    if (bin.length < 6) return "";

    try {
      const response = await fetch(`https://data.handyapi.com/bin/${bin}`, {
        headers: {
          "x-api-key": "your key here", // 🔐 your real key
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch BIN data");
      }

      const data = await response.json();
      console.log(data.Scheme);
      return (data.Scheme || "").toLowerCase();
    } catch (error) {
      console.error("Card type detection failed:", error);
      setApiError("Card type detection failed");
      return "";
    }
  };

  const cardInfo = cardConfig[cardType] || {};
  const cardBgColor = cardInfo?.color || "#7f8c8d";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-8 gap-10">
      {/* Card Preview */}
      <div
        className="w-96 h-60 rounded-2xl shadow-2xl text-white relative p-6 flex flex-col justify-between"
        style={{ backgroundColor: cardBgColor }}
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-8 bg-white rounded-md flex items-center justify-center">
            {cardInfo?.icon && (
              <img src={cardInfo.icon} alt="icon" className="h-6" />
            )}
          </div>
        </div>
        <div className="text-center text-2xl tracking-widest font-mono">
          {cardNumber || "0123 4567 8910 1112"}
        </div>
        <div className="flex justify-between text-sm font-light">
          <div>
            <div className="uppercase opacity-70">Cardholder</div>
            <div className="font-semibold text-base">
              {cardName || "JOHN DOE"}
            </div>
          </div>
          <div>
            <div className="uppercase opacity-70">Expires</div>
            <div className="font-semibold text-base">
              {cardExpire || "01/31"}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Smart Card Info
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              className="uppercase w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="JOHN DOE"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between items-center">
              Card Number
              <button
                type="button"
                className="text-xs px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={generateRandomCard}
              >
                Generate Random
              </button>
            </label>
            <input
              type="text"
              pattern="[0-9\s]+"
              maxLength="19"
              minLength="6"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="0123 4567 8910 1112"
            />
            {apiError && (
              <div className="text-red-500 text-sm mt-1">{apiError}</div>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Expiry (mm/yy)
              </label>
              <input
                type="text"
                maxLength="5"
                pattern="[0-9/]+"
                value={cardExpire}
                onChange={(e) => {
                  let value = e.target.value;

                  // Remove all non-digit characters except "/"
                  value = value.replace(/[^0-9]/g, "");

                  // Auto-insert "/" after two digits
                  if (value.length > 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2);
                  }

                  setCardExpire(value);
                }}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                maxLength="4"
                minLength="3"
                pattern="[0-9]+"
                value={cardSecurity}
                onChange={(e) => setCardSecurity(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="123"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
