import React, { useState } from "react";
import {
  visa,
  mastercard,
  rupay,
  amex,
  diners,
  discover,
  jcb,
  nfc,
  chip,
  carddefault,
  cardback,
} from "../config/cardIcons";

const cardConfig = {
  visa: { icon: visa, color: "#2563EB" }, // Tailwind blue-600
  mastercard: { icon: mastercard, color: "#F97316" }, // Tailwind orange-500
  rupay: { icon: rupay, color: "#10B981" }, // Tailwind emerald-500
  "american express": { icon: amex, color: "#6366F1" }, // Tailwind indigo-500
  "diners club": { icon: diners, color: "#EC4899" }, // Tailwind pink-500
  discover: { icon: discover, color: "#F59E0B" }, // Tailwind amber-500
  jcb: { icon: jcb, color: "#8B5CF6" }, // Tailwind violet-500
  nfc: { icon: nfc },
  chip: { icon: chip },
  carddefault: { icon: carddefault },
  cardback: { icon: cardback },
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
  // const cardBgColor = cardInfo?.color || "#7f8c8d";
  // const bankInfo = cardConfig[cardType] || {};

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-8 gap-10">
      {/* Card Preview Front */}
      <div className="flex gap-3 flex-col items-center justify-center">
        <div
          className="w-96 h-60 rounded-2xl shadow-2xl text-white relative p-6 flex flex-col justify-between cursor-pointer select-none"
          // style={{ backgroundColor: cardBgColor }}
          style={{ backgroundImage: `url(${carddefault})` }}
        >
          <div className="flex justify-between items-start">
            <div>Bank Name</div>
            <div cardName="flex justify-between items-end">
              <img
                src={nfc}
                alt="icon"
                className="h-10 opacity-100 contrast-10"
              />
            </div>
          </div>
          <div>
            <img src={chip} alt="icon" className="h-10 mt-5 ml-5 opacity-80" />
          </div>
          <div className="text-center text-2xl tracking-widest font-mono mb-3">
            {cardNumber || "0123 4567 8910 1112"}
          </div>
          <div className="flex justify-between items-center text-sm font-light">
            <div>
              <div className="flex justify-between items-center gap-2.5">
                <div className="uppercase opacity-70">Valid Upto</div>
                <div className="font-semibold text-base">
                  {cardExpire || "01/31"}
                </div>
              </div>
              <div>
                <div className="font-semibold text-base">
                  {cardName || "JOHN DOE"}
                </div>
              </div>
            </div>
            <div>
              <div className="w-12 h-8 bg-white rounded-md flex items-center justify-center">
                {cardInfo?.icon && (
                  <img src={cardInfo.icon} alt="icon" className="h-14" />
                )}
              </div>
              <div className="uppercase opacity-110 font-semibold text-center mt-0.5">
                Type
              </div>
            </div>
          </div>
        </div>
        {/* Card Preview Back */}
        <div className="w-96 h-60 rounded-xl bg-gradient-to-br from-gray-800 to-black text-white p-5 shadow-lg relative font-mono">
          {/* Bank Website Link */}
          <div className="bg-gray-900 rounded-md px-4 py-2 mb-3 text-sm tracking-wide border border-gray-700">
            www.yourbankwebsite.com
          </div>

          {/* Magnetic Strip */}
          <div className="bg-gray-700 h-10 rounded-md mb-5 border border-gray-600"></div>

          {/* Signature and CVV */}
          <div className="flex justify-between space-x-4">
            {/* Signature Box */}
            <div className="flex-1">
              <div className="bg-white text-black h-12 rounded-md px-3 py-2 border border-gray-400 text-xs font-semibold">
                Signature
              </div>
            </div>

            {/* CVV Box */}
            <div className="w-20">
              <div className="bg-white text-black h-12 rounded-md px-3 py-2 border border-gray-400 text-xs font-semibold text-center">
                CVV
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          💳 Smart Card Info
        </h2>

        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              className="uppercase w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              placeholder="JOHN DOE"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="text-sm font-semibold text-gray-600 flex justify-between items-center mb-1">
              Card Number
              <button
                type="button"
                className="text-xs px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200"
                onClick={generateRandomCard}
              >
                Generate
              </button>
            </label>
            <input
              type="text"
              pattern="[0-9\s]+"
              maxLength="19"
              minLength="6"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              placeholder="0123 4567 8910 1112"
            />
            {apiError && (
              <p className="text-red-500 text-sm mt-1">{apiError}</p>
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Expiry (mm/yy)
              </label>
              <input
                type="text"
                maxLength="5"
                pattern="[0-9/]+"
                value={cardExpire}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9]/g, "");
                  if (value.length > 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2);
                  }
                  setCardExpire(value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                CVV
              </label>
              <input
                type="text"
                maxLength="4"
                minLength="3"
                pattern="[0-9]+"
                value={cardSecurity}
                onChange={(e) => setCardSecurity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
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
