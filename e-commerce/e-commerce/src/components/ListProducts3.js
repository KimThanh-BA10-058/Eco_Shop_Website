import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../dataSlide";
import ProductItem3 from "./ProductItem3";
import { collection, getDocs} from 'firebase/firestore';
import { db, storage } from '../firebaseConfig'
import {ref, uploadBytes, getDownloadURL, listAll, getStorage, deleteObject, uploadBytesResumable} from "firebase/storage"
import { type } from "@testing-library/user-event/dist/type";



const Container = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const ListProducts3 = ({ filters, sort }) => {

  // const [data, setData] = useState([])
  // const getData = async () => {
  //   const res = await axios.get('https://640940c7d16b1f3ed6cda267.mockapi.io/KT/cate2')
  //   setData(res.data)
  // }
  // useEffect(() => {
  //   getData()
  // },[])
  // console.log(data)
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productItemList, setProductItemList] = useState([]);

  const collectionProduct = collection(db, "products3") 
  const getProductItemList = async() =>{
      //readDATA
      const data = await getDocs(collectionProduct);
      const filteredData = data.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id,
      }));
      setProductItemList(filteredData)
  };
 
  useEffect(()=>{
    getProductItemList();
  },[]);
  console.log()
  useEffect(() => {
      setFilteredProducts(
        productItemList.filter((product) =>
          product
        ) 
      );
  }, [productItemList, filters]);
 
  useEffect(() => {
    if (sort === "sort") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
    {filteredProducts.map((product) => <ProductItem3 product={product} key={product.id} />)
        }
    </Container>
  )
}

export default ListProducts3;