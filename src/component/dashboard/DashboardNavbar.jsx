'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/provider/AuthProvider';
import { Sun, Moon, Menu } from 'lucide-react';

const DashboardNavbar = ({ onMenuClick }) => {
  const { user } = useContext(AuthContext);


  return (
    <header className="bg-white dark:bg-gray-800 border-b px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Show menu icon on mobile */}
        <button onClick={onMenuClick} className="md:hidden text-gray-800 dark:text-white">
          <Menu className="w-6 h-6" />
        </button>
        {/* <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1> */}
      </div>
    </header>
  );
};

export default DashboardNavbar;
