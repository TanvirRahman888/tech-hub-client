'use client';
import { AuthContext } from '@/app/provider/AuthProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchCartItems = async (email) => {
  const res = await fetch(`http://localhost:5000/cartitems?email=${email}`);
  if (!res.ok) throw new Error('Failed to fetch cart items');
  return res.json();
};

const NavBar = () => {
  const pathname = usePathname();
  const { user, logOut } = useContext(AuthContext);


  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);

  const mobileDropdownRef = useRef(null);
  const mobileNavRef = useRef(null);
  const dropdownRef = useRef(null);

  const isActive = (href) => pathname === href;

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/allproducts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuOpen && mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users`)
        .then(res => res.json())
        .then(users => {
          const currentUser = users.find(u => u.email === user.email);
          if (currentUser) {
            setRole(currentUser.role);
          }
        });
    }
  }, [user]);

  // Use TanStack Query for real-time cart updates
  const { data: cartItems = [] } = useQuery({
    queryKey: ['cartItems', user?.email],
    queryFn: () => fetchCartItems(user.email),
    enabled: !!user && role === 'buyer',
    staleTime: 1000 * 60, // cache 1 minute
  });

  const cartCount = cartItems.length;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logOut()
        .then(() => {
          setMenuOpen(false);
          setDropdownOpen(false);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://a.storyblok.com/f/102007/928x288/ab39b006d0/tech-hub-light-blue.png"
            className="h-8"
            alt="TechHub Logo"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : user?.photoURL ? (
            <img src={user.photoURL} alt="User Avatar" className="w-7 rounded-full" />
          ) : (
            <div className="w-7 h-7 bg-gray-300 rounded-full" />
          )}
        </button>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center md:space-x-8 md:order-1">
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 font-medium">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`block py-2 px-3 rounded md:p-0 ${isActive(href)
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

        {/* Desktop Right Section */}
        <div className="hidden md:flex md:order-2 items-center gap-3 relative" ref={dropdownRef}>
          {user && role === 'buyer' && (
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" className="w-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 bg-gray-300 rounded-full" />
                )}                {user.displayName || user.email}
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-md z-50 transition-all duration-200 animate-fadeIn">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div ref={mobileNavRef} className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 font-medium border-t border-gray-200 dark:border-gray-700 pt-4">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded ${isActive(href)
                    ? 'text-white bg-blue-700'
                    : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    }`}
                >
                  {name}
                </Link>
              </li>
            ))}
            {user && role === 'buyer' && (
              <li>
                <Link href="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({cartCount})</span>
                </Link>
              </li>
            )}

          </ul>

          <div className="mt-4 border-t pt-3 border-gray-200 dark:border-gray-700 flex flex-col gap-2" ref={mobileDropdownRef}>
            {user ? (
              <>
                <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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
