'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/provider/AuthProvider';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { user, loading } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?callbackUrl=/cart');
        }
    }, [user, loading, router]);

    // Fetch cart items and enrich with product details
    useEffect(() => {
        if (!loading && user) {
            fetch(`http://localhost:5000/cartitems?email=${user.email}`)
                .then(res => res.json())
                .then(async (cartData) => {
                    const products = await fetch('http://localhost:5000/products').then(res => res.json());

                    const enriched = cartData.map(item => {
                        const product = products.find(p => p?.pid === item.pid);
                        return { ...item, ...product };
                    });

                    setCartItems(enriched);
                });
        }
    }, [user, loading]);

    const handleRemove = (id) => {
        fetch(`http://localhost:5000/cartitems/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then((result) => {
                if (result.success) {
                    setCartItems(items => items.filter(item => item._id !== id));
                } else {
                    alert(result.message || 'Failed to delete');
                }
            });
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading your cart...</div>;
    }

    if (!cartItems.length) {
        return (
            <div className="text-center mt-20 text-gray-600">
                <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">🛍️ Your Cart</h1>

            <ul className="space-y-6">
                {cartItems.map((item,idx) => (
                    <li key={idx} className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="text-sm text-gray-600">Category: {item.category}</p>
                            <p className="text-sm text-gray-600">Price: ${item.price}</p>

                            <button
                                onClick={() => router.push(`/products/${item.pid}`)}
                                className="text-blue-600 hover:underline text-sm mt-2"
                            >
                                View Product
                            </button>
                        </div>

                        <button
                            onClick={() => handleRemove(item._id)}
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-8 text-right">
                <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Checkout
                </button>
            </div>
        </div>
    );
}
