import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

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
} from "../config/cardIcons";

const cardConfig = {
  visa: { icon: visa },
  mastercard: { icon: mastercard },
  rupay: { icon: rupay },
  "american express": { icon: amex },
  "diners club": { icon: diners },
  discover: { icon: discover },
  jcb: { icon: jcb },
  nfc: { icon: nfc },
  chip: { icon: chip },
  carddefault: { icon: carddefault },
};

const cardNumbers = [
  { number: "4210 0611 1111 1111" }, // Visa Debit
  { number: "4166 4411 1111 1111" }, // Visa Credit
  { number: "4510 0690 1111 1111" }, // Visa Prepaid
  { number: "5086 3710 5555 4444" }, // Rupay Debit
  { number: "6529 7210 5678 9012" }, // Rupay Credit
  { number: "5545 3410 5678 9012" }, // Mastercard Debit
  { number: "5243 7369 5678 9012" }, // Mastercard Credit
  { number: "3747 412463 10005" }, // American Express Credit
  { number: "3610 102025 5904" }, // Diners Club Credit
];

function CardForm() {
  const [cardNetwork, setCardNetwork] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardBrand, setCardBrand] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpire, setCardExpire] = useState("");
  const [cardSecurity, setCardSecurity] = useState("");
  const [apiError, setApiError] = useState("");
  const [isFront, setIsFront] = useState(true); // 👈 Controls front/back side

  const { user } = useAuth();
  const handleSaveCard = async (e) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpire || !cardSecurity) {
      return toast.warn("All fields are required!");
    }
    try {
      const response = await axios.post(
        `https://react-smartcardinfo.onrender.com/api/cards/email/${user.email}`,
        {
          cardNumber,
          cardName,
          cardExpire,
          cardSecurity,
          cardNetwork,
          cardType,
          cardBrand,
        }
      );
      console.log(response.data);
      toast.success("Card saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Card save failed!");
    }
    finally {
      setCardNumber("");
      setCardName("");
      setCardExpire("");
      setCardSecurity("");
      setCardNetwork("");
      setCardType("");
      setCardBrand("");
      setIsFront(true);
    }
  };

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
        setCardNetwork(detectedType.scheme.toLowerCase());
        setCardType(detectedType.type.toUpperCase());
        setCardBrand(detectedType.issuer);
      } else {
        setCardNetwork("");
        setCardType("");
        setCardBrand("");
      }
    } else {
      setCardNetwork("");
      setCardType("");
      setCardBrand("");
    }
  };

  const detectCardTypeFromAPI = async (cardNumber) => {
    const bin = cardNumber.replace(/\D/g, "").slice(0, 6);
    if (bin.length < 6) return "";

    try {
      const response = await fetch(`https://data.handyapi.com/bin/${bin}`, {
        headers: {
          "x-api-key": "HAS-0YDdq61vXRkLmPgNu5ntZUVc48", // 🔐 your real key
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch BIN data");
      }

      const data = await response.json();
      console.log(data.Scheme);
      return {
        scheme: data.Scheme,
        type: data.Type,
        issuer: data.Issuer || "",
      };
    } catch (error) {
      console.error("Card type detection failed:", error);
      setApiError({ error });
      return "";
    }
  };

  const cardInfo = cardConfig[cardNetwork] || {};

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-full bg-gradient-to-r from-gray-600 to-gray-900 p-8 gap-10">
        <div
          onClick={() => setIsFront(!isFront)}
          className="flex gap-3 flex-col items-center justify-center"
        >
          {/* Card Preview */}
          {isFront ? (
            // 🔵 Front Side
            <div
              className="w-96 h-60 rounded-2xl shadow-2xl text-white relative p-6 flex flex-col justify-between cursor-pointer select-none"
              style={{ backgroundImage: `url(${carddefault})` }}
            >
              <div className="flex justify-between items-start">
                <div>{cardBrand || "BANK NAME"}</div>
                <div className="flex justify-between items-end">
                  <img
                    src={nfc}
                    alt="icon"
                    className="h-10 opacity-100 contrast-10"
                  />
                </div>
              </div>
              <div>
                <img
                  src={chip}
                  alt="icon"
                  className="h-10 mt-5 ml-5 opacity-80"
                />
              </div>
              <div className="text-center text-2xl tracking-widest font-mono mb-3">
                {cardNumber || "0123 4567 8910 1112"}
              </div>
              <div className="flex justify-between items-center text-sm font-light">
                <div>
                  <div className="flex justify-between items-center gap-2.5">
                    <div className="uppercase opacity-70">Valid Upto</div>
                    <div className="font-semibold text-base">
                      {cardExpire || "MM/YY"}
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
                    {cardType || "Type"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // 🔵 Back Side
            <div className="w-96 h-60 rounded-xl bg-gradient-to-br from-[#01081F] to-[#021740] text-white p-5 shadow-xl font-sans cursor-pointer select-none">
              {/* Bank Name */}
              <div className="bg-[#0A1A3A] rounded-md px-4 py-2 mb-4 text-xs tracking-wide border border-[#0F2C59] font-medium shadow-inner">
                {cardBrand || ""}
              </div>

              {/* Magnetic Strip */}
              <div className="bg-[#050505] h-10 rounded-md mb-6 border border-[#0F2C59] shadow-inner"></div>

              {/* Signature and CVV */}
              <div className="flex justify-between space-x-4">
                {/* Signature Box */}
                <div className="flex-1">
                  <div className="flex justify-between items-center bg-white text-black h-12 rounded-md px-3 py-2 border border-gray-300 text-xs font-semibold shadow-sm tracking-wide">
                    Signature{" "}
                    <div className="font-[cursive] italic text-sm text-gray-800 tracking-wide opacity-70">
                      {cardName || "JOHN DOE"}
                    </div>
                  </div>
                </div>

                {/* CVV Box */}
                <div className="w-20">
                  <div className="bg-white text-black h-12 rounded-md px-3 py-2 border border-gray-300 text-xs font-semibold shadow-sm text-center tracking-widest">
                    CVV{" "}
                    <div className="opacity-70">{cardSecurity || "123"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Form */}
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4 md:p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            💳 Smart Card Info
          </h2>

          <form className="space-y-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="uppercase w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                placeholder="JOHN DOE"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="text-sm font-semibold text-gray-600 flex justify-between items-center mb-1">
                Card Number
                <button
                  type="button"
                  className="text-xs px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200 cursor-pointer"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                placeholder="0123 4567 8910 1112"
              />
              {apiError && (
                <p className="text-red-500 text-sm mt-1">{apiError}</p>
              )}
            </div>

            {/* Expiry & CVV */}
            <div className="flex space-x-5">
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
            {/* Save Card Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-1/2 flex justify-center align-center  py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
                onClick={handleSaveCard}
              >
                💾 Save Card
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default CardForm;
