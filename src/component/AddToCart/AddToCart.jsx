'use client';

import { AuthContext } from "@/app/provider/AuthProvider";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AddToCart = ({ product }) => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const addToCart = () => {
        if (!user) {
            alert("You must be logged in to add items to your cart.");
            return;
        }

        const { pid, name, category, price, image } = product;
        const userEmail = user.email;
        const cartItem = { userEmail, pid, name, category, price, image };

        fetch("http://localhost:5000/cartitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItem),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Item added to cart successfully!");
                    // ✅ Invalidate cache to re-fetch cart items
                    queryClient.invalidateQueries(['cartItems', user.email]);
                }
            })
            .catch(err => {
                console.error("Error adding to cart:", err);
                alert("Something went wrong!");
            });
    };

    return (
        <button
            onClick={addToCart}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
            Add to Cart
        </button>
    );
};

export default AddToCart;
