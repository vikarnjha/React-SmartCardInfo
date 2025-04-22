import { useState, useEffect } from "react";
import Cards from "./Cards";
import { useAuth } from "../context/AuthContext";
// import cardsData from '../cards.json'

const SavedCards = (email) => {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `https://react-smartcardinfo.onrender.com/api/cards/email/${user.email}`
        );
        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error("Failed to fetch cards", err);
      }
    };

    fetchCards();
  }, [email]);
  return (
    <>
      {cards.map((card, idx) => (
        <Cards
          key={idx}
          cardNumber={card.cardNumber}
          cardExpiry={card.cardExpiry}
          cardName={card.cardName}
          cardSecurity={card.cardSecurity}
          cardType={card.cardType}
          cardNetwork={card.cardNetwork}
          cardBrand={card.cardBrand}
        />
      ))}
    </>
  );
};

export default SavedCards;
