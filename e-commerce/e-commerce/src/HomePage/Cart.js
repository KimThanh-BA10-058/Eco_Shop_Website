import { Add, CleaningServices, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Toolbar from "../components/Toolbar";
import { Link, useFetcher, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import axios from "axios";
import CartItem from "../components/CartItem";

import { collection, getDoc,getDocs, doc} from 'firebase/firestore';
import { db } from '../firebaseConfig'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 500;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    position: relative;
    top: -50px;
    cursor: pointer; 
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"}
`

const TopText = styled.span`
    text-decoration: underline;
    margin: 0px 10px;
    cursor: pointer;
    position: relative;
    top: -20px;
    right: 20px;
    font-weight: 400;
    font-size: 20px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    flex: 3;
`
const Productt = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
`
const ProductDetail = styled.div`
    flex: 2;
`
const Image = styled.img`
    width: 200px;
    display: flex;
    justify-content: flex-start;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    top: -120px;
    left: 200px;
    text-align: left;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductEdition = styled.div`
   
`
const ProductStatus = styled.div``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    position: relative;
    top: 50px;
    left: 100px;
    flex-direction: column;
`
const AmountContainer = styled.div`
    display: flex; 
    align-items: center;
    font-weight: 600;
`
const Amount = styled.span`
    width: 25px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid teal;
    margin: 0px;
    padding: 5px;
`
const Icon = styled.button`
    font-size: 5px;
    margin: 0px;
    border: 1px solid teal;
    cursor: pointer;
`
const Price = styled.div`
    font-size: 30px;
    flex-direction: column;
    position: relative;
    top: 10px;
    right: 120px;
    
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 80vh;
    text-align: left;
`
const SummaryTitle = styled.h2`
    font-size: 50;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`
const SumText = styled.span``
const SumPrice = styled.span``
const Button = styled.button`
    width: 90%;
    padding: 10px;
    background-color: white;
    color: black;
    font-weight: 500;
    cursor: pointer;
    border: 2px solid black;
    &:hover{
        background-color: black;
        color: white;
        border: 3px solid red;
    }
`
const Buttonn= styled.button`
background-color: white;
width: 50px;
height: 20px;
color: black;
font-weight: 400;
cursor: pointer;
border: 1px solid black;
`


const Cart = () => {
    const cartItems = useSelector((state) => state.cart.itemsList);
    console.log(cartItems)
    const dispatch = useDispatch();
    const allPrice = () => {
        let total = 0;
        cartItems.forEach((item) =>{total += item?.quantity * item?.price});
        /* let totals = total; */
        return total;
    };
    const totals = allPrice();
    
  return (
    <Container>
        <Annoucement />
        <Navbar />
            <Wrapper>
                <Title>Your Bag </Title>
                <Top>
                    <Link to="/"><TopButton> Shopping Now </TopButton></Link>
                    <TopButton type="filled">Checkout</TopButton>   
                </Top>
                <Bottom> 
                    <Info> 
                        {cartItems?.map((item, index) => (
                            <CartItem key={item?.id} id={item?.id} name={item?.name} brand={item?.brand} img={item?.img} price={item?.price} quantity={item.quantity} SL = {item.SL} />
                        ))}
                        <hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SumText> Subtotal </SumText>
                            <SumPrice> {allPrice()}.000<sup>đ</sup> </SumPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SumText> Total </SumText>
                            <SumPrice> {totals}.000<sup>đ</sup> </SumPrice>
                        </SummaryItem>
                        <Link to="/cash"><Button>Checkout now!!</Button></Link>
                    </Summary>
                </Bottom>
            </Wrapper>
        <Footer />
    </Container>
  );
};

export default Cart