import React from 'react'
import Cards from './Cards'
import cardsData from '../cards.json'

const SavedCards = () => {
  return (
    <>
    {cardsData.map((cards, idx) => (
            <Cards
              key={idx}
              cardNumber={cards.cardNumber}
              cardExpiry={cards.cardExpiry}
              cardName={cards.cardName}
              cardSecurity={cards.cardSecurity}
              cardType={cards.cardType}
              cardNetwork={cards.cardNetwork}
              cardBrand={cards.cardBrand}
            />
          ))}
    </>
  )
}

export default SavedCards