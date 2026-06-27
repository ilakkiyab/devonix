import React from 'react';
import VariantSelector from './VariantSelector';
import StockIndicator from './StockIndicator';

const ProductPageContent = ({ product }) => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
      <img src={product.image} alt={product.name} className='w-full h-64 object-cover mb-4' />
      <p className='text-gray-600 mb-4'>{product.description}</p>
      <VariantSelector variants={product.variants} selectedVariant={product.selectedVariant} onSelect={(variant) => console.log('Selected variant:', variant)} />
      <StockIndicator stock={product.stock} />
      <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mt-4'>
        Buy Now
      </button>
    </div>
  );
};

export default ProductPageContent;