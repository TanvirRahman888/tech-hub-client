'use client';

import { useEffect, useState } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch()


    setTimeout(() => {
      setProducts(fakeProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700 mt-1">Price: ৳{product.price}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
