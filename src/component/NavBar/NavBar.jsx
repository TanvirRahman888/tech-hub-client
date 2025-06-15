'use client';
import { AuthContext } from '@/app/provider/AuthProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';


const NavBar = () => {


  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'All Products', href: '/allproducts' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => pathname === href;

  const { user, logOut } = useContext(AuthContext)
  const handelLogout = () => {
    logOut()
      .then(() => {
        console.log("Sign-out successful.");
      }).catch((error) => {
        console.error(error)
      });

  }


  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://a.storyblok.com/f/102007/928x288/ab39b006d0/tech-hub-light-blue.png" className="h-8" alt="TechHub Logo" />
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          {user ? <div className='flex gap-3 items-center'><h3> {user?.email} </h3> <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handelLogout}> Log Out</button>
          </div> :
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <Link href={"/login"}>Log In</Link>
            </button>
          }
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`block py-2 px-3 rounded-sm md:p-0 ${isActive(href)
                    ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
