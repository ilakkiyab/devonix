import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 hover:bg-gray-100 transition duration-300'>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className='w-full h-64 object-cover' />
        <h2 className='text-2xl font-bold mt-4'>{product.name}</h2>
        <p className='text-gray-600'>{product.description}</p>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-xl font-bold'>${product.price}</span>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
            <ShoppingCartIcon className='mr-2' />
            Buy Now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;