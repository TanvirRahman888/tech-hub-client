import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=" mx-0 py-10 mt-20">
      <div className="px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">TechHub</h2>
          <p className="text-sm">
            Your one-stop shop for smart gadgets, home tech, and innovative digital products designed to make your life easier.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold  mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
            <li><Link href="/products" className="hover:text-blue-500">Products</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold  mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-blue-500">FAQs</Link></li>
            <li><Link href="/returns" className="hover:text-blue-500">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-blue-500">Shipping Info</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded  text-sm border border-gray-600 focus:outline-none"
            />
            <button className="bg-blue-600 hover:text-blue-500bg-blue-700  py-2 rounded text-sm transition">
              Subscribe
            </button>
          </form>

          <div className="flex space-x-4 mt-4">
            <Link href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f hover:text-blue-500">FB</i></Link>
            <Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter hover:text-blue-500">X</i></Link>
            <Link href="https://instagram.com" target="_blank"><i className="fab fa-instagram hover:text-blue-500">IG</i></Link>
            <Link href="https://linkedin.com" target="_blank"><i className="fab fa-linkedin-in hover:text-blue-500">LI</i></Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} TechHub. All rights reserved.
      </div>
    </footer>
  );
}
