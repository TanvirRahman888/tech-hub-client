'use client';

import AddToCart from '@/component/AddToCart/AddToCart';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AllProducts = ({ onViewDetails }) => { // Added onViewDetails prop
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 21;

    useEffect(() => {
        fetch('allProducts.json')
            .then(res => res.json())
            .then(data => setProducts(data))
        setLoading(false);
    }, []);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
            window.scrollTo(0, 0); // Scroll to top
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
            window.scrollTo(0, 0); // Scroll to top
        }
    };

    if (loading) return <p className="text-center mt-10 text-lg">Loading products...</p>;

    return (
        <div className="max-w-6xl mx-auto p-4 pt-4">
            <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                    <div key={product.pid} className="border rounded-lg p-4 shadow hover:shadow-2xl transition flex flex-col relative">
                        {product.bestSelling && (
                            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                Best Seller
                            </span>
                        )}
                        <div className=' flex justify-center'>
                            <img src={product.image} alt={product.name} className="max-h-64 object-cover rounded-lg" />
                        </div>
                        <div className="mt-4 flex-grow">
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="mt-1 line-clamp-2">{product.shortDescription}</p>
                            <p className="text-gray-700 mt-1">Price: ${product.price}</p>
                            <p className="text-gray-700 mt-1">Category: {product.category}</p>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <Link href={`/products/${product.pid}`} className="flex-1 bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 transition">
                                View Details
                            </Link>
                            <AddToCart></AddToCart>
                        </div>
                    </div>
                ))}
            </div>

            {products.length > productsPerPage && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Previous
                    </button>
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProducts;