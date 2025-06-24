'use client';
import DashboardNavbar from '@/component/dashboard/DashboardNavbar';
import DashboardSidebar from '@/component/dashboard/DashboardSidebar';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';


export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?callbackUrl=/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="text-center mt-10 text-lg">Loading dashboard...</div>;
  }


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
