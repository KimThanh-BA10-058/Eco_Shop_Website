import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { TextField } from '@mui/material';
import httpClient from 'react-http-client';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from "../store/cart-slice";
import CartItem from "../components/CartItem";
import { Link } from 'react-router-dom';
import { RadioButton } from '../components/RadioButton'
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Cookies } from "react-cookie";
import myImage from '../image/eco1.png';
import CircularJSON from 'circular-json';

const Container = styled.div`
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.div`
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    display: flex;
    
`
const Title = styled.h2`
    font-weight: 500;
    text-align: center;
    position: relative;
    left: -150px;
`
const Form = styled.form``
const Right = styled.div`
    flex: 1;
    padding: 20;
    `
const TitleR = styled.h2`
    font-weight: 500;
    text-align: center;
`
const Info = styled.div``

const Center = styled.div`
    flex: 1;
    padding: 20;
`
const TitleC = styled.h2`
    font-weight: 500;
    text-align: center;
`
const Button = styled.button`
    width: 150px;
    padding: 10px;
    background-color: white;
    color: black;
    font-weight: 500;
    cursor: pointer;
    border: 2px solid black;
    &:hover{
        background-color: gray;
        color: white;
        border: 3px solid red;
    }
`

const Thanhtoan = () => {
    const [data, setData] = useState([]);
    const [customerName, setCustomerName] = useState("");
    console.log(customerName)
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhonenumber, setCustomerPhonenumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [customerIdNum, setCustomerIdNum] = useState("");

    const [Paymentmethod, setPaymentMethod] = useState("");

    const cartItems = useSelector((state) => state.cart.itemsList);

    const allPrice = () => {
        let total = 0;
        cartItems.forEach((item) =>{total += item?.quantity * item?.price});
        return total;
    };
    const totals = allPrice();
    
    async function handleCheckout (e) {
        e.preventDefault();
    //     const formData = new FormData()
    // formData.append("customerName", customerName)
    // formData.append("customerEmail", customerEmail)
    // formData.append("customerPhonenumber", customerPhonenumber)
        const orderData = {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhonenumber: customerPhonenumber,
          customerAddress: customerAddress,
          customerIdNum: customerIdNum, 
          cartItems: cartItems, 
          Paymentmethod: Paymentmethod,
          totals: totals,
        };
        console.log(Paymentmethod)
        const jsonString = CircularJSON.stringify([customerAddress, customerIdNum]);
        console.log(orderData)
        
        const response = await axios.post('http://localhost:8081/addOrder', orderData, jsonString, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        if (response.status === 200) {
            console.log('Order submitted successfully.');           
          } else {
            console.error('Error submitting order:', response.data);
          }
      };

    const radioChangeHandler = (e) => {
        setPaymentMethod(e.target.value);
    };
    const cookies2 = new Cookies();
    
  return (
    <Container>
    <Wrapper>
        <Left>  
            <Logo> <img src={myImage} style={{width: '113px', height: '114px'}}/> </Logo>                       
            <Title>Infor User</Title>
                <Link to = "/"><div style={{position:"relative", left:"130px", top:"-10px"}}><LogoutOutlined /> Back to Home Page</div></Link>  
            <TextField
                required
                id="outlined-required"
                label="User Name"
                variant="outlined"
                onChange={(e)=>setCustomerName(e.target.value)} 
                defaultValue={cookies2.get('usernameUser')}              
            />
            <br />
            <TextField
                required
                id="outlined-required"
                label="Email"
                variant="outlined"
                name="email"
                onChange={(e)=>setCustomerEmail(e.target.value)} 
                defaultValue={cookies2.get('emailUser')} 
            />
            <br />
            <TextField
                required
                id="outlined-required"
                label="Phone Number"
                variant="outlined"
                name="phonenumber"
                onChange={(e)=>setCustomerPhonenumber(e.target.value)} 
                defaultValue={cookies2.get('phonenumberUser')} 
            />
            <br />
            <TextField
                required
                id="outlined-required"
                label="Address"
                variant="outlined"
                name="Address"
                onChange={(e)=>setCustomerAddress(e.target.value)} 
            />
            <br />
             <TextField
                required
                id="outlined-required"
                label="Identification Number"
                variant="outlined"
                name="Identification_number"
                onChange={(e)=>setCustomerIdNum(e.target.value)} 
            />           
        </Left>
        <Center>
            <TitleC> Payment Method </TitleC>
            <div>
        <div className="radio-btn-container" style={{ display: "flex", flexDirection:"column"}}>
        <div style={{display:"flex", justifyContent:"flex-start"}}>
        <RadioButton
          changed={radioChangeHandler}
          id="1"
          isSelected={Paymentmethod === "QuickPay"}
          label="Quick Payment"
          value="Quick Payment  .       You can transfer money to the account number: 6068120901. ACB Bank."
        />
        </div>
        <div style={{display:"flex", justifyContent:"flex-start"}}>
        <RadioButton
          changed={radioChangeHandler}
          id="2"
          isSelected={Paymentmethod === "You will pay for the product when you receive it"}
          label="COD"
          value="Cash On Delivery  .       After completing the order, Hotline: 0328629655 will contact to confirrm the total value of the order (including the Ship fee according to the Carrier's fee schedule) & discuss payment.
            Thank you and we look forward to hearing from you for the inconvenience!"
        />
        </div>
        </div>
        {Paymentmethod === "QuickPay" && (
        <input
          style={{display:"flex", marginLeft:"75px", marginTop: "15px" }}
          type="text"
          placeholder="Enter transaction id"
        />
        )}
        <p style={{display:"flex", justifyContent:"flex-start", marginTop: "20px" }}>
            {Paymentmethod}
        </p>
        </div>
        </Center>
        <Right>
            <TitleR>Products Ordered</TitleR>
            <Info> 
                {cartItems?.map((item, index) => (
                    <div key={item?.id} style={{display:"flex", justifyContent:"space-between", margin:"10px"}}>
                    <img src={item?.img} style={{width: "90px", height:"70px",position:"relative", top:"-20px"}}/>
                        <div style={{display:"flex",flexDirection:"column", position:"relative", top:"-25px", right:"20px"}}>
                            <p>{item?.name}</p>
                        </div>
                        <p style={{positive:"relative", right:"-10px"}}> {item?.quantity*item?.price}.000đ</p>
                    </div>
                    ))}
                    <hr/>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <input placeholder='Enter Your Discount code'/>
                            <button type='submit'> Apply!! </button>
                        </div>
                    </div>
                    <hr/>
                        <div style={{display:"flex", justifyContent:"space-between"}}> 
                            <p>Total</p>
                            <p>{totals}.000<sup>đ</sup></p> 
                        </div>
            </Info>
        </Right>
    </Wrapper>
    <Button style={{height:'40px'}} onClick={handleCheckout}>Check Out now!!!</Button>
    </Container>
  )
}

export default Thanhtoan