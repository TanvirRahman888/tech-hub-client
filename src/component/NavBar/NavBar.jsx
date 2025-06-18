'use client';
import { AuthContext } from '@/app/provider/AuthProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react'; // Icon library (optional, can use heroicons or any svg)

const NavBar = () => {
  const pathname = usePathname();
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/allproducts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log('Sign-out successful.');
        setMenuOpen(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://a.storyblok.com/f/102007/928x288/ab39b006d0/tech-hub-light-blue.png"
            className="h-8"
            alt="TechHub Logo"
          />
        </Link>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center md:space-x-8 md:order-1">
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 font-medium">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive(href)
                      ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                      : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop User Info */}
        <div className="hidden md:flex md:order-2 items-center gap-3">
          {user ? (
            <>
              <span className="text-gray-800 dark:text-white text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 font-medium border-t border-gray-200 dark:border-gray-700 pt-4">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded ${
                    isActive(href)
                      ? 'text-white bg-blue-700'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile User Info & Logout */}
          <div className="mt-4 border-t pt-3 border-gray-200 dark:border-gray-700 flex flex-col gap-2">
            {user ? (
              <>
                <span className="text-gray-800 dark:text-white text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
