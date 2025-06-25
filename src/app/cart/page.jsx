'use client';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/app/provider/AuthProvider';
import { useRouter } from 'next/navigation';

const fetchCartItems = async (email) => {
  const res = await fetch(`http://localhost:5000/cartitems?email=${email}`);
  if (!res.ok) throw new Error('Failed to fetch cart items');
  return res.json();
};

const deleteCartItem = async (id) => {
  const res = await fetch(`http://localhost:5000/cartitems/${id}`, {
    method: 'DELETE',
  });
  const result = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Failed to delete cart item');
  }
  return result;
};

export default function CartPage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: cartItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['cartItems', user?.email],
    queryFn: () => fetchCartItems(user.email),
    enabled: !!user && !loading,
  });

  const { mutate: removeFromCart, isPending: isDeleting } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems', user.email]);
    },
    onError: (err) => {
      alert(err.message || 'Something went wrong while removing item.');
    },
  });

  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this item from the cart?')) {
      removeFromCart(id);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  if (loading || isLoading) {
    return <div className="text-center mt-10 text-lg">Loading your cart...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load cart items: {error.message}
      </div>
    );
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
        {cartItems.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

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
              disabled={isDeleting}
              className="text-red-500 hover:underline"
            >
              {isDeleting ? 'Removing...' : 'Remove'}
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
