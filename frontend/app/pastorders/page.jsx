import React, { useEffect, useState } from "react";

const PastOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/orders/")
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Past Orders</h1>
            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No past orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            Order #{order.id} - Total: ${order.total_price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PastOrdersPage;
