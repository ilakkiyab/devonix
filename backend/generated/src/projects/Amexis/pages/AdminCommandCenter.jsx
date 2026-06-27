import React from 'react';
import Navbar from '../components/Navbar';

const AdminCommandCenter = () => {
  return (
    <div>
      <Navbar />
      <h1 className='text-3xl font-bold text-blue-500 mt-10 px-6'>Admin Command Center</h1>
      <div className='flex flex-wrap justify-center mt-10 px-6'>
        <div className='w-full lg:w-1/3 px-4 mb-4 lg:mb-0'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Platform Commissions</h2>
            <p className='text-gray-600'>Manage commission rates</p>
          </div>
        </div>
        <div className='w-full lg:w-1/3 px-4 mb-4 lg:mb-0'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Vendor Verification</h2>
            <p className='text-gray-600'>Verify vendor accounts</p>
          </div>
        </div>
        <div className='w-full lg:w-1/3 px-4 mb-4 lg:mb-0'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Dispute Resolution</h2>
            <p className='text-gray-600'>Resolve disputes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommandCenter;