import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";

import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Toolbar from "../components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { Link, useLocation, useParams } from "react-router-dom";

import { collection, getDoc,getDocs, doc} from 'firebase/firestore';
import { db, storage } from '../firebaseConfig'

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
    width: 80%;
    text-align: left;
    word-break: break-word ;
    white-space: pre-line;
`

const Product2 = ({Name, Brand, img, description, price}) => {
    const [data, setData] = useState()
    // const getData = async() => {
    //     const res = await axios.get(`https://640940c7d16b1f3ed6cda267.mockapi.io/KT/cate2/${productID}`)
    //     setData(res.data)
    //     console.log(res.data)
    //   }
    // useEffect(() => {
    //     getData()
    //   },[]) 
    const {id} = useParams();
    const getProductItemList = async() =>{
        const docRef = doc(db, "products2", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setData(docSnap.data())
          } else {
            console.log("No such document!");
          }
    }
    useEffect(()=>{
      getProductItemList();
    },[id]);
    
    const dispatch = useDispatch();
    const addCart = ()=>{
        dispatch(cartActions.addToCart({
            ...data,
            name:data.Name,
            id:id,
            img:data.img,
            brand: data.Brand,
            description: data.description,
            price:data.price,
}))
    }

  return (
    <Container key={data?.id}>
        <Annoucement />
        <Navbar />
        <Toolbar />
        <Wrapper>
            <ImgContainer>
                <Image src={data?.img} />
            </ImgContainer>
            <InfoContainer>
                <Title> {data?.Name} </Title>
                <Price> Price: {data?.price}<sup>đ</sup> </Price>
                <span style={{display: 'flex',justifyContent: 'flex-start', fontSize: '40px', fontWeight: '100', marginTop: '20px'}}>Brand: {data?.Brand}</span>
            </InfoContainer>
            <AmountContainer>
            <Button onClick={addCart}> Add to cart</Button>
            </AmountContainer>   
        </Wrapper>
        <Description> 
            <Title2><hr/> Description </Title2>
            <Desc> {data?.description} </Desc>
        </Description>

        <Footer />
    </Container>
  );
};

export default Product2;