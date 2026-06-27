import React from 'react';

const StockIndicator = ({ stock }) => {
  const getStockColor = () => {
    if (stock > 10) return 'text-green-500';
    if (stock > 0) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className={`mt-2 ${getStockColor()}`}>
      {stock > 0 ? `${stock} left in stock` : 'Out of Stock'}
    </div>
  );
};

export default StockIndicator;