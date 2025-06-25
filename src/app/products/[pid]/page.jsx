'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/app/provider/AuthProvider'; 
import AddToCart from '@/component/AddToCart/AddToCart';

const ProductDetailsPage = () => {
    const { pid } = useParams();
    const router = useRouter();
    const { user, loading } = useContext(AuthContext);
    

    const [product, setProduct] = useState(null);
    // const [cartItem, setCartItem] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [sidebarProducts, setSidebarProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);

    // Redirect if user is not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push(`/login?callbackUrl=/products/${pid}`);
        }
    }, [user, loading, pid, router]);


    // Fetch product data if user is logged in
    useEffect(() => {
        if (!user) return;

        fetch('http://localhost:5000/products')
            .then((res) => res.json())
            .then((data) => {
                const selected = data.find((item) => item.pid == pid);
                setProduct(selected);

                const otherProducts = data.filter(item => item.pid != pid);
                const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
                setRecommended(shuffled.slice(0, 5));
                setSidebarProducts(shuffled.slice(5, 10));
                setProductLoading(false);
            });
    }, [pid, user]);

    if (loading || productLoading) return <p className="text-center mt-10 text-lg">Loading product...</p>;
    if (!product) return <p className="text-center mt-10 text-lg text-red-600">Product not found</p>;

    return (
            <div className="max-w-7xl mx-auto p-6 pt-4">
                <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline">
                    ← Back to All Products
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Product */}
                    <div className="flex-1">
                        <img src={product.image} alt={product.name} className="w-full object-cover rounded-lg" />
                        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
                        <p className="text-gray-700 mt-2">{product.fullDescription || product.description}</p>
                        <p className="text-xl mt-4">Price: <span className="font-semibold">${product.price}</span></p>
                        <p className="text-md mt-1 text-gray-600">Category: {product.category}</p>
                        {product.bestSelling && (
                            <span className="inline-block mt-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                Best Seller
                            </span>
                        )}
                        <div className="mt-6">
                            <AddToCart product={product}></AddToCart>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/3">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Products You May Like</h2>
                        <ul className="space-y-4">
                            {sidebarProducts.map((item) => (
                                <li key={item.pid} className="border rounded p-3 hover:shadow transition">
                                    <Link href={`/products/${item.pid}`} className="block">
                                        <div className="flex gap-3">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <div>
                                                <h3 className="text-sm font-medium">{item.name}</h3>
                                                <p className="text-xs text-gray-600">${item.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>

                {/* Recommended Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {recommended.map((item) => (
                            <div key={item.pid} className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col">
                                <img src={item.image} alt={item.name} className="h-32 object-cover rounded" />
                                <h3 className="mt-2 font-semibold text-sm">{item.name}</h3>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.shortDescription}</p>
                                <Link href={`/products/${item.pid}`} className="mt-auto text-blue-600 text-sm hover:underline">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default ProductDetailsPage;
