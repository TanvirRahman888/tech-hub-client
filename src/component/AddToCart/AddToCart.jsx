'use client';
import { AuthContext } from "@/app/provider/AuthProvider";
import { useContext } from "react";


const AddToCart = ({ pid }) => {

    const { user } = useContext(AuthContext);

    const addToCart = () => {
        if (!user) {
            alert("You must be logged in to add items to your cart.");
            return;
        }
        const userEmail = user.email;
        const cartItem = { userEmail, pid };

        console.log("Cart Item:", cartItem);

        //add cart items in database
        fetch("http://localhost:5000/cartitems",{
            method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cartItem),
        })
        .then(res=>res.json())
        .then(data=>{
             console.log(data)
                        if (data.insertedId) {
                            alert("Item Add to Cart Successfully!")
                        }
        })
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