'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/provider/AuthProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    pid: '',
    name: '',
    category: '',
    shortDescription: '',
    description: '',
    fullDescription: '',
    price: '',
    image: '',
    bestSelling: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        addedBy: user?.email || 'unknown',
      };
      await axios.post('http://localhost:5000/products', payload);
      alert('Product added successfully');
      router.push('/dashboard/products');
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="pid" placeholder="Product ID" value={formData.pid} onChange={handleChange} className="p-2 border rounded" required />
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="p-2 border rounded" required />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="p-2 border rounded" required />
        <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="p-2 border rounded" required />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="p-2 border rounded" />
        <textarea name="shortDescription" placeholder="Short Description" value={formData.shortDescription} onChange={handleChange} className="p-2 border rounded col-span-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded col-span-2" />
        <textarea name="fullDescription" placeholder="Full Description" value={formData.fullDescription} onChange={handleChange} className="p-2 border rounded col-span-2" />
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" name="bestSelling" checked={formData.bestSelling} onChange={handleChange} />
          Best Selling
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2">
          Add Product
        </button>
      </form>
    </div>
  );
}
