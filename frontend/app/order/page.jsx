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

    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await fetch('http://localhost:8000/api/order-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(orders),
      });

      if (response.ok) {
        localStorage.removeItem('orders');
        setOrders({ kebabs: [], total_price: 0 });
        alert('Order successfully placed!');
        router.push('/');
      } else {
        const data = await response.json();
        alert(`Order Failed: ${data.detail}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold mb-6 tracking-widest">🔥 Your Order 🔥</h1>

      {orders.kebabs.length === 0 ? (
        <p className="text-xl bg-gray-200 text-black px-6 py-4 rounded-xl shadow-xl">No delicious kebabs added yet!</p>
      ) : (
        <div className="w-full max-w-2xl bg-gray-200 text-black rounded-xl shadow-2xl p-6">
          <ul>
            {orders.kebabs.map((kebab, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-400"
              >
                <span className="text-lg font-bold">{kebab.type} Kebab</span>
                <span className="text-lg">${kebab.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-2xl font-semibold mt-4 text-right">
            Total: ${orders.total_price.toFixed(2)}
          </h3>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-6 justify-center">
        <button
          onClick={handleScrapOrder}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl transition-all duration-300"
        >
          🔥 Scrap Order & Go Home
        </button>

        <button
          onClick={handleCreateNewBurrito}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-all duration-300"
        >
          🌯 Create New Kebab
        </button>

        {orders.kebabs.length > 0 && (
          <button
            onClick={handleSubmitOrder}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl transition-all duration-300"
          >
            ✅ Submit Order
          </button>
        )}
      </div>

      {/* Fire Accent */}

      {/* Fire Animation CSS */}
      <style jsx global>{`
        @keyframes flameGlow {
          0%, 100% {
            box-shadow: 0 0 10px #ff9a00, 0 0 20px #ff4e00, 0 0 30px #ff0000;
          }
          50% {
            box-shadow: 0 0 15px #ff4e00, 0 0 25px #ff0000, 0 0 35px #ff9a00;
          }
        }

        .shadow-2xl {
          animation: flameGlow 2s infinite alternate;
        }
      `}</style>
    </div>
  );
}
