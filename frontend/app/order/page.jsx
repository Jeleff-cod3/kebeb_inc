'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const [orders, setOrders] = useState({ kebabs: [], total_price: 0 });
  const router = useRouter();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || { kebabs: [], total_price: 0 };
    setOrders(storedOrders);
  }, []);

  const handleScrapOrder = () => {
    localStorage.removeItem('orders');
    setOrders({ kebabs: [], total_price: 0 });
    router.push('/');
  };

  const handleCreateNewBurrito = () => {
    router.push('/create-kebab');
  };

  const handleSubmitOrder = async () => {
    if (orders.kebabs.length === 0) return;

    try {
      const response = await fetch('http://localhost:8000/api/order-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orders),
      });

      if (response.ok) {
        localStorage.removeItem('orders');
        setOrders({ kebabs: [], total_price: 0 });
        alert('Order successfully placed!');
        router.push('/');
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Your Order</h1>
      {orders.kebabs.length === 0 ? (
        <p className="text-lg">No burritos/kebabs added yet!</p>
      ) : (
        <ul className="w-full max-w-lg bg-white p-4 shadow rounded-lg">
          {orders.kebabs.map((kebab, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              <span>{kebab.type} Kebab</span>
              <span className="font-bold">${kebab.price.toFixed(2)}</span>
            </li>
          ))}
          <h3 className="text-lg font-semibold mt-4">Total Price: ${orders.total_price.toFixed(2)}</h3>
        </ul>
      )}
      <div className="mt-4 flex gap-4">
        <button onClick={handleScrapOrder} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
          Scrap Order & Go Home
        </button>
        <button onClick={handleCreateNewBurrito} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          Create New Burrito
        </button>
        {orders.kebabs.length > 0 && (
          <button onClick={handleSubmitOrder} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            Submit Order
          </button>
        )}
      </div>
    </div>
  );
}
