'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBurritoPage() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [kebabType, setKebabType] = useState('B'); // Default selection
    const router = useRouter();

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await fetch('http://localhost:8000/api/ingredients-list');
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        }
        fetchIngredients();
    }, []);

    const toggleIngredient = (ingredient) => {
        setSelectedIngredients((prev) => {
            const exists = prev.find((item) => item.id === ingredient.id);
            return exists ? prev.filter((item) => item.id !== ingredient.id) : [...prev, ingredient];
        });
    };

    const handleSaveBurrito = () => {
        if (!kebabType || selectedIngredients.length === 0) return;

        const basePrice = 4;
        const ingredientsPrice = selectedIngredients.reduce((total, item) => total + item.price, 0);
        const totalPrice = basePrice + ingredientsPrice;

        const newBurrito = {
            type: kebabType,
            price: totalPrice,
            ingredients: selectedIngredients.map(item => item.id),
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders')) || { kebabs: [], total_price: 0 };
        existingOrders.kebabs.push(newBurrito);
        existingOrders.total_price += totalPrice;

        localStorage.setItem('orders', JSON.stringify(existingOrders));
        router.push('/order');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">Create Your Burrito</h1>
            <button
                onClick={() => router.push('/order')}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
                Scrap & Back to Orders
            </button>

            {/* Kebab Type Selection */}
            <div className="w-full max-w-lg bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Choose Kebab Type</h2>
                <div className="flex gap-4">
                    {["B", "C"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setKebabType(type)}
                            className={`px-4 py-2 rounded-lg shadow ${kebabType === type ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                            {type}
                        </button>
                    ))}
                </div>

                {/* Ingredient Selection */}
                <h2 className="text-xl font-semibold mt-4 mb-2">Choose Ingredients</h2>
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="flex justify-between p-2 border-b">
                            <span>{ingredient.name}</span>
                            <span className="font-bold">${ingredient.price.toFixed(2)}</span>
                            <button
                                onClick={() => toggleIngredient(ingredient)}
                                className={`ml-4 px-2 py-1 rounded-lg shadow ${selectedIngredients.find(item => item.id === ingredient.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                {selectedIngredients.find(item => item.id === ingredient.id) ? 'Remove' : 'Add'}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Display Total Price & Create Button */}
                {selectedIngredients.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Total Price: ${(4 + selectedIngredients.reduce((total, item) => total + item.price, 0)).toFixed(2)}</h3>
                        <button
                            onClick={handleSaveBurrito}
                            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                            Create Burrito
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
