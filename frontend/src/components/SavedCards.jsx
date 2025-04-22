import {useState, useEffect} from 'react'
import Cards from './Cards'
// import cardsData from '../cards.json'

const SavedCards = (email) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cards/email/abc@gmail.com`);
        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error('Failed to fetch cards', err);
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
  )
}

export default SavedCards