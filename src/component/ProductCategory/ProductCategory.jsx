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
        <div className="my-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Check Products by Categories</h2>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className="border border-blue-400 p-4 rounded shadow  hover:shadow-lg transition">
            <img src={cat.image} alt={cat.category} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold text-center">{cat.category}</h3>
            <p className="text-sm text-center">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default ProductCategory;