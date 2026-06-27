import React from 'react';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  return (
    <div className='flex flex-wrap justify-center mt-4'>
      {variants.map((variant, index) => (
        <button
          key={index}
          className={
            'px-4 py-2 bg-gray-200 text-gray-600 rounded-lg mr-2 mb-2' +
            (selectedVariant === variant ? ' bg-blue-500 text-white' : '')
          }
          onClick={() => onSelect(variant)}
        >
          {variant}
        </button>
      ))}
    </div>
  );
};

export default VariantSelector;