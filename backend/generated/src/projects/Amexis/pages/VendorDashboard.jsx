import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const VendorDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Navbar />
        <h1 className='text-3xl font-bold text-blue-500 mt-10'>Vendor Dashboard</h1>
        <div className='flex flex-wrap justify-center mt-10'>
          <div className='w-full lg:w-1/2 px-4 mb-4 lg:mb-0'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-2xl font-bold mb-4'>Inventory Management</h2>
              <p className='text-gray-600'>Manage your products and stock</p>
            </div>
          </div>
          <div className='w-full lg:w-1/2 px-4 mb-4 lg:mb-0'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-2xl font-bold mb-4'>Sales Analytics</h2>
              <p className='text-gray-600'>View your sales performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;