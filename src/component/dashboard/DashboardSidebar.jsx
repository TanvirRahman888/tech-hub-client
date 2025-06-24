'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'All Users', href: '/dashboard/users' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'Add Product', href: '/dashboard/addproduct' },
];

const DashboardSidebar = ({ isOpen }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="p-4 text-xl font-bold text-gray-800 dark:text-white">Dashboard</div>
      <nav className="flex flex-col gap-1 p-4">
        {links.map(({ name, href }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              pathname === href
                ? 'bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-400 font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
