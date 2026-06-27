import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className='bg-white py-4 px-6 flex justify-between items-center'>
      <NavLink to='/' className='text-2xl font-bold text-blue-500'>Amexis</NavLink>
      <button
        className='lg:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon /> : <Bars3Icon />}
      </button>
      <div
        className={
          isOpen
            ? 'lg:flex hidden flex-col absolute top-16 left-0 w-full bg-white py-4 px-6'
            : 'lg:flex hidden flex-col'
        }
      >
        <NavLink
          to='/customer'
          className='lg:inline-block mb-4 lg:mb-0 lg:ml-6 text-blue-500 hover:text-blue-600'
        >
          Customer Portal
        </NavLink>
        <NavLink
          to='/vendor'
          className='lg:inline-block mb-4 lg:mb-0 lg:ml-6 text-blue-500 hover:text-blue-600'
        >
          Vendor Dashboard
        </NavLink>
        <NavLink
          to='/admin'
          className='lg:inline-block lg:ml-6 text-blue-500 hover:text-blue-600'
        >
          Admin Command Center
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;