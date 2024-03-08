import { Link } from "react-router-dom"
import styled from "styled-components"
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Menu } from 'antd';
import '../App.css';
import React from "react";
import '../App.css';
  
const Navigation = styled.div`
display: flex;
justify-content: flex-start;
background-color: #9ec2e6;
color: black;
height: 60px;
`;
const Ul = styled.ul`
    padding: 0;
    text-align: center;
    margin: 10px;
    padding: 10px 20px;
    &:hover{
        background-color: gray;
    }
`;

const MENU = styled.menu`
  margin: 10px; 
  padding: 10px 20px;
  background-color: 9ec2e6;
  text-align: center;
`

const Toolbar = () => {
return (
<Navigation>
    <Link to ="/" className="linkk"><Ul className="dropdown">
        Home
    </Ul></Link>
    <br />
    <Link to ="/order-history" className="linkk"><Ul className="dropdown">
        Order History
    </Ul></Link>
    <br/>
  <Link to ="/story" className="linkk"><Ul className="dropdown">
        Our Story
    </Ul></Link>
</Navigation>

)}
export default Toolbar