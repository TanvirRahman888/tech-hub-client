'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts(); // refresh list
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">PID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Price ($)</th>
              <th className="p-2 text-left">Best Selling</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id} className="border-t text-gray-800 dark:text-gray-300">
                <td className="p-2">
                  <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="p-2">{prod.pid}</td>
                <td className="p-2">{prod.name}</td>
                <td className="p-2">{prod.category}</td>
                <td className="p-2">{prod.price}</td>
                <td className="p-2">{prod.bestSelling ? 'Yes' : 'No'}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => alert('Edit functionality coming soon')}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
