import { Add, Remove } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { cartActions } from '../store/cart-slice'


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
const ProductEdition = styled.div``
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

const CartItem = ({name, id, brand, img, SL, quantity, price, total}) => {
    
    const dispatch = useDispatch();
    const increase=()=>{    
        if(SL === 0 ){
            alert("over")
        }else{
        dispatch(cartActions.addToCart({
            name:name,
            id:id,
            img:img,
            brand:brand,
            price:price,
            SL:SL,
            quantity: quantity,
    }));
}
    };
    console.log(SL)
    const decrease=()=>{
        dispatch(cartActions.removeFromCart(id));       
    }
  return (
    <div>
    <Productt key={id}>
        <ProductDetail>
            <Image src = {img}/>
            <Details>
                <ProductName><b>Product:</b> {name} </ProductName>
                <ProductEdition><b>Brand: </b> {brand} </ProductEdition>
            </Details>
        </ProductDetail>
        <PriceDetail> 
        <AmountContainer> 
            <Icon onClick={decrease}><Remove/></Icon>
            <Amount> {quantity} </Amount>
            <Icon onClick={increase}><Add/></Icon>  
        </AmountContainer>
        <Price> {price * quantity}.000<sup>đ</sup></Price>
        </PriceDetail> 
    </Productt>
    </div>
  )
}

export default CartItem