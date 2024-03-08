import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../dataSlide";
import { collection, getDocs} from 'firebase/firestore';
import { db, storage } from '../firebaseConfig'
import {ref, uploadBytes, getDownloadURL, listAll, getStorage, deleteObject, uploadBytesResumable} from "firebase/storage"
import ProductItem2 from "./ProductItemm";



const Container = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const Products2 = ({ filters, sort }) => {
  const [productItemList, setProductItemList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const collectionProduct = collection(db, "products2") 
  const getProductItemList = async() =>{
      //readDATA
      const data = await getDocs(collectionProduct);
      const filteredData = data.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id,
      }));
      setProductItemList(filteredData)
  };
  console.log(productItemList)

  useEffect(()=>{
    getProductItemList();
  },[]);
  
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
        {filteredProducts.slice(0, 8).map((product) => <ProductItem2 product={product} key={product.id} />)
        }
    </Container>
  )
}

export default Products2