import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './OrderHistory.css';

const OrderHistory = () => {
  const [data, setData] = useState([]);
  const [orderIdToCancel, setOrderIdToCancel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [cookies] = useCookies(['usernameUser']);

  // Định nghĩa hàm fetchData bên ngoài useEffect
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/getOrdersByCustomerName/${customerName}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const savedUsername = cookies.usernameUser;
    if (savedUsername) {
      setCustomerName(savedUsername);
    }

    // Gọi fetchData ở đây
    fetchData();
  }, [customerName]);

  const cancelOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/cancelOrder/${orderIdToCancel}`);
      console.log(response.data.message);
      fetchData(); // Cập nhật lại danh sách đơn hàng sau khi huỷ
      setOrderIdToCancel(''); // Xóa ID đơn hàng cần huỷ
    } catch (error) {
      console.error('Lỗi khi huỷ đơn hàng:', error);
    }
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  return (
    <div className="order-history-container">
  <h1 className="order-history-title">Order History</h1>
  <div className="cancel-order">
    <input
      type="text"
      placeholder="Enter Order ID to Cancel"
      value={orderIdToCancel}
      onChange={(e) => setOrderIdToCancel(e.target.value)}
    />
    <button onClick={cancelOrder}>Cancel Order</button>
  </div>
  <ul className="order-history-list">
    {data.map((order) => (
      <li className="order-item" key={order.orderId}>
        <div className="order-details">
          <h2 className="order-id">Order ID: {order.ordersID}</h2>
          <p className="customer-name">Customer Name: {order.CustomerName}</p>
          <p className="order-status">Status: {order.status}</p>
        </div>
        <Link to={`/order-detail/${order.ordersID}`} className="view-details">
          View Details
        </Link>
      </li>
    ))}
  </ul>
</div>

  );
};

export default OrderHistory;
