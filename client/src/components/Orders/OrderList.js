import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard"; // Import your OrderCard component
import { getOrders } from "../../managers/orderManager"; // Adjust this import based on your order manager

export default function OrderList({ setDetailsOrderId }) {
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders().then(setOrders); // Replace getOrders with your actual method to fetch orders
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <h2>Orders</h2>
      {orders.map((order) => (
        <OrderCard
          order={order}
          key={order.id}
        ></OrderCard>
      ))}
    </>
  );
}
