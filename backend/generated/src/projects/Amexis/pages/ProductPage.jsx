import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <h1 className='text-3xl font-bold text-blue-500 mt-10 px-6'>Product Page</h1>
      <div className='flex flex-wrap justify-center mt-10 px-6'>
        <div className='w-full lg:w-1/2 px-4 mb-4 lg:mb-0'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Product {id}</h2>
            <p className='text-gray-600'>Product description</p>
            <img src='https://via.placeholder.com/400x300' alt='Product' className='w-full h-64 object-cover mt-4' />
            <div className='flex justify-between items-center mt-4'>
              <span className='text-xl font-bold'>$19.99</span>
              <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;