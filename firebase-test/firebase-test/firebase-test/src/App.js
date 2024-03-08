import {Menu} from 'antd';
import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Database2 from './component/Database2';
import OrderManagement from './test/OrderManagement';
import Search from './test/Search';
import OrderDetail from './test/OrderDetails';
import Noti from './test/Noti';
import SendEmail from './component/SendEmail';

const App = () => {
  const navigate = useNavigate()
  return (
  <div style={{display:"flex", flexDirection:"row"}}>
      <Menu 
      onClick={({key})=>{
          if(key === "signout"){
              //todo
          }else{
              navigate(key)
          }
      }}
          items={[
              {label: "Home", key:"home"},
              {label: "Product Management", key:"productmanagement"},
              {label: "Order Management", key:"ordermanagement"},
              {label: "Order Detail", key:"orderdetails"},
              {label: "Search", key:"search"},
              {label: "Noti", key:"noti"},
              {label: "Send Email", key:"sendemail"},
          ]}
      ></Menu>
      <Content/>
  </div>
)};
const Content = () =>{
  return (
      <div>
          <Routes>
              <Route path='/home' element = {<div>Home</div>} />
              <Route path="/productmanagement" element={<Database2/>} />
              <Route path="/ordermanagement" element={<OrderManagement/>} />
              <Route path="/orderdetails" element={<OrderDetail/>} />
              <Route path="/search" element={<Search/>} />
              <Route path='/noti' element={<Noti/>}/>
              <Route path='/sendemail' element={<SendEmail/>}/>

          </Routes> 
      </div>
  )
}

export default App;
