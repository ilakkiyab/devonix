import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className='lg:w-64 w-0 flex-shrink-0 bg-blue-500 text-white p-4'>
      <button
        className='lg:hidden absolute top-4 left-4 text-white'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon /> : <Bars3Icon />}
      </button>
      <div
        className={
          isOpen
            ? 'lg:block hidden absolute top-16 left-0 w-64 bg-blue-500 p-4'
            : 'lg:block hidden'
        }
      >
        <NavLink
          to='/vendor'
          className='block py-2 px-4 hover:bg-blue-600'
        >
          Vendor Dashboard
        </NavLink>
        <NavLink
          to='/vendor/inventory'
          className='block py-2 px-4 hover:bg-blue-600'
        >
          Inventory Management
        </NavLink>
        <NavLink
          to='/vendor/analytics'
          className='block py-2 px-4 hover:bg-blue-600'
        >
          Sales Analytics
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;