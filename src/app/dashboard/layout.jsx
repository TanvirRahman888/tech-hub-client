'use client';
import DashboardNavbar from '@/component/dashboard/DashboardNavbar';
import DashboardSidebar from '@/component/dashboard/DashboardSidebar';
import { useState } from 'react';


export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40  bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 z-10">
        <DashboardNavbar onMenuClick={toggleSidebar} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
