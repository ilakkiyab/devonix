import React from 'react';

const StockIndicator = ({ stock }) => {
  return (
    <div className='flex items-center mt-4'>
      <span className='text-gray-600'>Stock Left:</span>
      <span className={
        'ml-2 text-xl font-bold' +
        (stock < 10 ? ' text-red-500' : ' text-green-500')
      }>
        {stock}
      </span>
    </div>
  );
};

export default StockIndicator;