import { useState } from "react";
import {
  // visa,
  // mastercard,
  // rupay,
  // amex,
  // diners,
  // discover,
  // jcb,
  nfc,
  chip,
  carddefault,
} from "../config/cardIcons";

// const cardConfig = {
//   visa: { icon: visa },
//   mastercard: { icon: mastercard },
//   rupay: { icon: rupay },
//   "american express": { icon: amex },
//   "diners club": { icon: diners },
//   discover: { icon: discover },
//   jcb: { icon: jcb },
//   nfc: { icon: nfc },
//   chip: { icon: chip },
//   carddefault: { icon: carddefault },
// };

const Cards = ({
  cardNumber,
  cardExpiry,
  cardName,
  cardSecurity,
  cardType,
  cardNetwork,
  cardBrand,
}) => {
  const [isFront, setIsFront] = useState(true); // 👈 Controls front/back side

  return (
    <>
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
                    {cardExpiry || "MM/YY"}
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
                  <img src={cardNetwork} alt="icon" className="h-14" />
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
                  CVV <div className="opacity-70">{cardSecurity || "123"}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cards;
