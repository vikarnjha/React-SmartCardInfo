import React from 'react'
import Cards from './Cards'
import cardsData from '../cards.json'

const SavedCards = () => {
  return (
    <>
    {cardsData.map((card, idx) => (
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