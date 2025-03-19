'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBurritoPage() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [kebabType, setKebabType] = useState('B');
    const router = useRouter();

    useEffect(() => {
        async function fetchIngredients() {
            const res = await fetch('http://localhost:8000/api/ingredients-list');
            const data = await res.json();
            setIngredients(data);
        }
        fetchIngredients();
    }, []);

    const toggleIngredient = ingredient => {
        setSelectedIngredients(prev => {
            const exists = prev.some(item => item.id === ingredient.id);
            return exists
                ? prev.filter(item => item.id !== ingredient.id)
                : [...prev, ingredient];
        });
    };

    const handleSaveBurrito = () => {
        if (!kebabType || selectedIngredients.length === 0) return;

        const ingredientsPrice = selectedIngredients.reduce((sum, item) => sum + item.price, 0);
        const totalPrice = 4 + ingredientsPrice;

        const newBurrito = {
            type: kebabType,
            price: totalPrice,
            ingredients: selectedIngredients.map(i => i.id),
        };

        const orders = JSON.parse(localStorage.getItem('orders')) || { kebabs: [], total_price: 0 };
        orders.kebabs.push(newBurrito);
        orders.total_price += totalPrice;

        localStorage.setItem('orders', JSON.stringify(orders));
        router.push('/order');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            <h1 className="text-5xl font-bold tracking-wide mb-6">🔥 Craft Your Kebbab 🔥</h1>

            <button
                onClick={() => router.push('/order')}
                className="mb-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full shadow-xl transition-all duration-300"
            >
                ❌ Scrap & Return
            </button>

            {/* Burrito Customizer */}
            <div className="max-w-xl w-full bg-gray-200 rounded-xl shadow-2xl p-8 text-black">
                {/* Choose Kebab Type */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">🍖 Select Your Meat</h2>
                    <div className="flex gap-4">
                        {[
                            { value: 'B', label: '🥩 Beef' },
                            { value: 'C', label: '🍗 Chicken' },
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => setKebabType(value)}
                                className={`px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 ${kebabType === value
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-400 text-black'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ingredients Selection */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">🌶️ Choose Your Ingredients</h2>
                    <ul className="max-h-64 overflow-y-auto pr-2">
                        {ingredients.map(ingredient => {
                            const isSelected = selectedIngredients.some(i => i.id === ingredient.id);
                            return (
                                <li
                                    key={ingredient.id}
                                    className="flex justify-between items-center border-b border-gray-300 py-2"
                                >
                                    <span className="font-medium">{ingredient.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold">${ingredient.price.toFixed(2)}</span>
                                        <button
                                            onClick={() => toggleIngredient(ingredient)}
                                            className={`px-4 py-1 rounded-full shadow transition duration-300 ${isSelected ? 'bg-red-600 text-white' : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {isSelected ? 'Remove' : 'Add'}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Total & Save Button */}
                {selectedIngredients.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-xl font-bold">
                            💰 Total Price: $
                            {(4 + selectedIngredients.reduce((sum, i) => sum + i.price, 0)).toFixed(2)}
                        </h3>
                        <button
                            onClick={handleSaveBurrito}
                            className="w-full mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-xl transition-all duration-300"
                        >
                            🔥 Add to Order
                        </button>
                    </div>
                )}
            </div>


            {/* Flame Animation CSS */}
            <style jsx global>{`
                @keyframes flameGlow {
                    0%, 100% {
                        box-shadow: 0 0 8px #ff9a00, 0 0 16px #ff4e00, 0 0 24px #ff0000;
                    }
                    50% {
                        box-shadow: 0 0 12px #ff4e00, 0 0 20px #ff0000, 0 0 28px #ff9a00;
                    }
                }
                .shadow-2xl {
                    animation: flameGlow 2s infinite alternate;
                }
            `}</style>
        </div>
    );
}
