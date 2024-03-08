import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetail = () => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/getOrderDetails');
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchData(); 
  }, []);
  
  return (
    <div>
      <h1>Order Details</h1>
      <table>
      <thead>
        <tr>
          <th style={{width: '20px'}}>ID</th>
          <th>Orders ID</th>
          <th>Product ID</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Name</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {data.map(order => (
          <tr key={order.ID}>
            <td>{order.ID}</td>
            <td>{order.orders_ID}</td>
            <td>{order.product_id}</td>
            <td>{order.price}</td>
            <td>{order.quantity}</td>
            <td>{order.ProductName}</td>
            <td>{order.ProductImage}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default OrderDetail;
