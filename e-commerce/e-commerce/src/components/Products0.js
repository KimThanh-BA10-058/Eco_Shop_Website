import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../dataSlide";
import ProductItem from "./ProductItem";
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
const Products0 = ({ filters, sort }) => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/getData');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchData(); 
  }, []);
  
  useEffect(() => {
      setFilteredProducts(
        data.filter((product) =>
          product
        ) 
      );
  }, [data, filters]);
 
  useEffect(() => {
    if (sort === "newest") {
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
    {filteredProducts.map((product) => <ProductItem product={product} key={product.ID} />)
        }
    </Container>
  )
}

export default Products0