import React, { useState } from 'react';

const BinLookup = () => {
  const [bin, setBin] = useState('');
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState('');

  const fetchBinData = async () => {
    if (!bin) return;

    try {
      const response = await fetch(`https://data.handyapi.com/bin/${bin}`, {
        headers: {
          'x-api-key': 'your-api-key-here', // 🔐 Replace with your actual API key
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCardData(data);
      setError('');
    } catch (err) {
      setCardData(null);
      setError('Error fetching card info');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">BIN Lookup</h2>

      <input
        type="text"
        placeholder="Enter BIN (e.g. 535316)"
        value={bin}
        onChange={(e) => setBin(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />

      <button
        onClick={fetchBinData}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Lookup
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {cardData && (
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><strong>Scheme:</strong> {cardData.Scheme}</p>
          <p><strong>Type:</strong> {cardData.Type}</p>
          <p><strong>Issuer:</strong> {cardData.Issuer}</p>
          <p><strong>Card Tier:</strong> {cardData.CardTier}</p>
          <p><strong>Country:</strong> {cardData.Country.Name} ({cardData.Country.A2})</p>
        </div>
      )}
    </div>
  );
};

export default BinLookup;
