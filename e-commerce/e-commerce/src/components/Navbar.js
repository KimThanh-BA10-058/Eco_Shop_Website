import { Search, SettingsApplicationsOutlined, ShoppingCartOutlined, NotificationsActiveOutlined, Email  } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import { cartActions } from '../store/cart-slice';
import axios from 'axios'
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import myImage from '../image/eco.png';
import Searchh from './Searchh';
import io from 'socket.io-client';

const Container = styled.div`
    height: 125px;
    background-color: darkgreen;
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    width:33.33%;
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;
const SearchContainer = styled.div`
    border: 0.2px solid gray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    width: 250px;
    height: 30px;
`;
const Input = styled.input`
    border: none;
    height: 25px;
`;

const Center = styled.div`
    width:33.34%;
    flex: 1;
`;

const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: ivory;
`;

const Right = styled.div`
    width:33.33%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 20px;
    cursor: pointer;
    margin-left: 25px;
    padding: 5px;
    color: ivory;
`;

const NotificationContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.strong`
  display: block;
  margin-bottom: 5px;
`;

const NotificationMessage = styled.span`
  display: block;
  color: #555;
`;

const clientSocket = io('http://localhost:8081/client');
const Navbar = (token) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    clientSocket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const quantity = useSelector(state=> state.cart.totalQuantity);
  const dispatch = useDispatch();
  const showCart = () => {
    dispatch(cartActions.setShowCart());
  };
  const [auth, setAuth] = useState(false)
  const [text, setText] = useState('LOGIN')
  const cookies = new Cookies()
  axios.defaults.withCredentials = true;
     useEffect(()=>{
      if(cookies.get('token') === 'undefined'){
        setAuth(false);
        setText('LOGIN');
        console.log("a")       
     }else{
      axios.get(`http://localhost:8081/verifyuser?token1=`+cookies.get('token'))
      .then(res =>{
        if(res.data.Status === "Success") {
          setAuth(true);
          setText('LOGOUT');
          console.log("b")
        }else{
          setAuth(false);
          setText('LOGIN');
          console.log("c")
        }
      })
      }
    },[])
    
    const handleLogout=()=>{
      axios.get('http://localhost:8081/logout')
      .then(res => {
        if(res.data.Status === "Success") {
          cookies.remove("token")
          cookies.remove("emailUser")
          cookies.remove("usernameUser")
          cookies.remove("phonenumberUser")
          setAuth(false);
          setText('LOGIN');
        }else{
          alert("error");
        }
      }) 
      .catch(err=>console.log(err))
    }

    
  return (
    <div>
    <Container>
        <Wrapper>
            <Left> 
              <Searchh /> 
            </Left>
            <Center> <img src={myImage} style={{width: '93px', height: '94px', position:'relative', left:'30px'}}/> </Center>
            <Right> 
            <div style={{display:'flex'}}>
                <MenuItem onClick={showCart}> 
                <Link to="/cart" className='linkk'><Badge style={{color:'ivory', position:'relative', top:'-4px'}} badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                </Badge> </Link>
                </MenuItem>
                <NotificationContainer>
      <Badge style={{color:'ivory', position:'relative', left:'9px',top:'4px'}} badgeContent={notifications.length} color="primary" onClick={toggleDropdown}>
        <NotificationsActiveOutlined />
      </Badge>
      {showDropdown && (
        <NotificationDropdown>
          <NotificationList>
            {notifications.map((notification, index) => (
              <NotificationItem key={index}>
                <NotificationTitle>{notification.title && <strong>{notification.title}: </strong>}</NotificationTitle>
                <NotificationMessage>{notification.message}{' '}</NotificationMessage>
              </NotificationItem>
            ))}
          </NotificationList>
        </NotificationDropdown>
      )}
    </NotificationContainer>
                <Link to={`/updateuserdetails`}><MenuItem> <SettingsApplicationsOutlined/> </MenuItem></Link>
            </div>
                <div>
                {
                    auth ? 
                <div>
                    <MenuItem onClick={handleLogout}>{text}</MenuItem>
                </div>
                    :
                <div>
                <Link to="/login" className='linkk'><MenuItem>{text}</MenuItem></Link>
                </div>
                } 
                </div>
                <Link to="/register" className='linkk'><MenuItem> REGISTER </MenuItem></Link>
            </Right>
        </Wrapper>
    </Container>
    </div>
  )
}
export default Navbar