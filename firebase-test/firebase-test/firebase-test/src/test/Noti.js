import React, { useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const adminSocket = io('http://localhost:8081/admin');

// Tạo các thành phần styled-component
const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const Noti = () => {
  const [notification, setNotification] = useState({ title: '', message: '' });

  const sendNotification = () => {
    adminSocket.emit('sendNotification', { ...notification });
    setNotification({ title: '', message: '' });
  };

  return (
    <Container>
      <InputField
        type="text"
        placeholder="Tiêu đề"
        value={notification.title}
        onChange={(e) => setNotification({ ...notification, title: e.target.value })}
      />
      <InputField
        type="text"
        placeholder="Nhập thông báo"
        value={notification.message}
        onChange={(e) => setNotification({ ...notification, message: e.target.value })}
      />
      <br />
      <br />
      <br />
      <SendButton onClick={sendNotification}>Gửi thông báo</SendButton>
    </Container>
  );
};

export default Noti;
