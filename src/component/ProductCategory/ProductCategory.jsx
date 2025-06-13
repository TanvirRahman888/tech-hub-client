'use client'
import { useEffect, useState } from "react";

const ProductCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    fetch('/category.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to load categories', err));
  }, []);


    return (
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition">
            <img src={cat.image} alt={cat.category} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{cat.category}</h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default ProductCategory;