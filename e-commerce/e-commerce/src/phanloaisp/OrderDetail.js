import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/getOrderDetail/${orderId}`);
      setOrderDetail(response.data);
    } catch (error) {
      console.error('Error fetching order detail:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderId]); 

  return (
    <div>
      <h1>Order Detail</h1>
      {orderDetail ? (
        <ul>
          {orderDetail.map((order) => (
            <li key={order.ID}>
              <div>ID: {order.ID}</div>
              <div>Product Name: {order.ProductName}</div>
              <div>Orders ID: {order.orders_ID}</div>
              <div>Product ID: {order.product_id}</div>
              <div>Price: {order.price}</div>
              <div>Quantity: {order.quantity}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetail;
