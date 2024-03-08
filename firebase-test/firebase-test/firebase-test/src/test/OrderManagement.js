import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(''); // Trạng thái được chọn

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/getOrders');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchData();
  }, []);

  const handleStatusChange = async (orderId) => {
    // Kiểm tra trạng thái của đơn hàng
    const orderToUpdate = data.find((order) => order.ordersID === orderId);
    if (orderToUpdate.status === 'Cancelled') {
      alert('Cannot update status for a cancelled order.');
      return;
    }

    try {
      if (selectedStatus) {
        await axios.post(`http://localhost:8081/updateStatus?orderId=${orderId}&stt=${selectedStatus}`);
        const updatedData = data.map((order) => {
          if (order.ordersID === orderId) {
            return { ...order, status: selectedStatus };
          }
          return order;
        });
        setData(updatedData);
      } else {
        alert('Please select a status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const sortedOrders = data.slice().sort((a, b) => {
    return a.status.localeCompare(b.status);
  });

  return (
    <div>
      <h1>Order Management</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Identification Number</th>
            <th>Created_at</th>
            <th>Updated_at</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Payment Method</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.ordersID}</td>
              <td>{order.CustomerName}</td>
              <td>{order.CustomerEmail}</td>
              <td>{order.CustomerPhonenumber}</td>
              <td>{order.CustomerAddress}</td>
              <td>{order.CustomerIDNum}</td>
              <td>{order.create_at}</td>
              <td>{order.update_at}</td>
              <td>{order.status}</td>
              <td>
                {order.status !== 'Cancelled' ? (
                  <div>
                    <select
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      value={selectedStatus}
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivery">Delivery</option>
                    </select>
                    <button
                      onClick={() => handleStatusChange(order.ordersID)}
                    >
                      Update Status
                    </button>
                  </div>
                ) : null}
              </td>
              <td>{order.Paymentmethod}</td>
              <td>{order.TotalPrice}</td>
              <td>
                {order.status !== 'Cancelled' ? (
                  <button
                    onClick={() => handleStatusChange(order.ordersID, 'Cancelled')}
                  >
                    Cancel Order
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
