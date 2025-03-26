"use client";

import { useState, useEffect } from "react";
import Navbar from "../../Componenets/NavBar";
import { useRouter } from "next/navigation";



interface CartItem {
  id: number;
  description: string;
  title: string;
  price: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l1 6h13l1-6h2"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10v6m-4-6v6m-4-6v6m-4-6v6"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="15" cy="20" r="1"></circle>
            </svg>
            <p className="text-gray-500 mt-4 text-lg">Your cart is empty.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => router.push("/customerDashboard")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-black">
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Information</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="text-center border-t">
                    <td className="p-2 border text-black">{item.title}</td>
                    <td className="p-2 border text-black">{item.description}</td>
                    <td className="p-2 border text-black">${item.price.toFixed(2)}</td>
                    <td className="p-2 border text-black">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <h2 className="text-xl font-semibold">Total: ${getTotalPrice()}</h2>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
