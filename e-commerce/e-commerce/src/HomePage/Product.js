import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Toolbar from "../components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import axios from 'axios';

const Container = styled.div`

`
const Wrapper = styled.div`
    margin: 20px;
    display: flex;
`
const ImgContainer = styled.div`
    width: 40%;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    width: 60%;
    padding: 0px 50px;
    flex-direction: column;
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 45px;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
    display: flex;
    justify-content: flex-start;
`

const FilterContainer = styled.div`
    flex-direction: column;
    width: 250px;
    height: 400px;
`
const Filter = styled.div`
    display: flex;
    flex-direction: column;

`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    margin-left: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin: 20px;
`
const Option = styled.option``

const AddContainer = styled.div`
    justify-content: flex-start;
    display: flex;
    text-align: left;
    position: relative;
    bottom: 150px;
`
const AmountContainer = styled.div`
    display: flex; 
    align-items: center;
    font-weight: 600;
    justify-content: 'flex-start';
    align-items: 'flex-start';
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
const Icon = styled.div`
    font-size: 5px;
    margin: 0px;
    border: 1px solid teal;
    cursor: pointer;
`
const Button = styled.button`
    padding: 15px;
    border: 1px solid teal;
    background: orange;
    cursor: pointer;
    font-weight: 500;
    margin-left: 15px;
    &:hover {
        background-color: white;
    }
    `  

const Description = styled.div``
const Title2 = styled.h2`
    text-align: left;
    font-size: 30px;
    font-weight: Bold;
`
const Desc = styled.p`
    width: 60%;
    text-align: left;
    word-break: break-word ;
    white-space: pre-line;
`

const Product =({Name, Brand, image, Description, Price, quantityy}) => {
    const [data, setData] = useState({});
        const searchParams = new URLSearchParams(document.location.search);

      const response = axios.get(`http://localhost:8081/product/${searchParams.get('id')}`)
    .then(res =>{
        setData(res.data[0]);
    }).catch((error) => {
        console.error('Error updating data:', error);
      });
    
    
    const dispatch = useDispatch();
    const addCart = ()=>{
        dispatch(cartActions.addToCart({
            ...data,
            name:data.Name,
            ID:searchParams.get('id'),
            img:data.image,
            brand: data.Brand,
            quantity: data.quantity,
            description: data.Description,
            price:data.Price,
}))

console.log(data.ID)
    }

  return (
      
    <div key={data.ID}>
        <Annoucement />
        <Navbar />
        <Toolbar />
        <div style={{margin: '20px',display: 'flex'}}>
            <div style={{width: '40%'}}>
                <img style={{width: '100%',height: '90vh',objectFit: 'cover'}} src={data.image} />
            </div>
            <div style={{width: '60%',padding: '0px 50px',flexDirection: 'column'}}>
                <h1 style={{fontWeight: '400', fontSize: '45px'}}> {data.Name} </h1>
                <span style={{fontWeight: '100',fontSize: '40px',display: 'flex',justifyContent: 'flex-start'}}> Price: {data?.Price}<sup>đ</sup> </span>
                <span style={{display: 'flex',justifyContent: 'flex-start', fontSize: '40px', fontWeight: '100', marginTop: '20px'}}>Brand: {data?.Brand}</span>
            </div>
            <AmountContainer>
                <button onClick={addCart} style={{padding: '15px', border: '1px solid teal', background: 'orange', cursor: 'pointer',
fontWeight: '500',marginLeft: '15px',"&:hover": {backgroundColor: "white"},}}> Add to cart</button>
            </AmountContainer>   
        </div>
        <div> 
            <h2 style={{textAlign: 'left',fontSize: '30px',fontWeight: 'Bold', wordBreak:"break-word", whiteSpace:"pre-line"}}><hr/> Description </h2>
            <p style={{width: '60%', textAlign: 'left',wordBreak: 'break-word' ,whiteSpace: 'pre-line'}}> {data?.Description} </p>
        </div>
        <Footer />
    </div>
  );
};

export default Product;
