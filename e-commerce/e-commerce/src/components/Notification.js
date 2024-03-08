// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import '../App.css';

// const clientSocket = io('http://localhost:8081/client');

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   useEffect(() => {
//     clientSocket.on('notification', (data) => {      
//             setNotifications((prevNotifications) => [...prevNotifications, data]);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Thông báo</h1>
//       <ul>
//         {notifications.map((notification, index) => (
//           <li key={index}>
//             {notification.title && <strong>{notification.title}: </strong>}
//             {notification.message}{' '}
//             {notification.link && (
//               <a href={notification.link} target="_blank" rel="noopener noreferrer">
//                 [Xem chi tiết]
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Notification;
