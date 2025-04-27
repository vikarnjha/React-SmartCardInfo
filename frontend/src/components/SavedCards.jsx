import { useState, useEffect } from "react";
import Cards from "./Cards";
import { useAuth } from "../context/AuthContext";
import Loading from "../loading/Loading";

const API_URL = import.meta.env.VITE_BACKEND;

const SavedCards = (email) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/card/email/${user.email}`
        );
        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error("Failed to fetch cards", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [email, user.email]);
  return (
    <>
    {isLoading && <Loading />} 
      {cards.map((card, idx) => (
        <Cards
          key={idx}
          cardNumber={card.cardNumber}
          cardExpire={card.cardExpire}
          cardName={card.cardName}
          cardSecurity={card.cardSecurity}
          cardType={card.cardType}
          cardNetwork={card.cardNetwork}
          cardBrand={card.cardBrand}
          cardId={card._id}
        />
      ))}
    </>
  );
};

export default SavedCards;
