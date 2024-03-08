import {Routes, Route, useLocation, Link} from 'react-router-dom'
import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Navbar from "../components/Navbar"
import ListProducts1 from "../components/ListProducts1"
import Footer from "../components/Footer"
import Toolbar from '../components/Toolbar'
import { useState } from 'react'
import { db, storage } from '../firebaseConfig'
import { useEffect } from 'react'


const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilerContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const Filter = styled.div`
    margin: 20px;  

`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`

const Option = styled.option``

const Button = styled.button``

const ProductList = () => {
    
  const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("sort");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
          ...filters,
          [e.target.name]: value,
        });
      };
    console.log(filters)
    
  return (
    <Container>
        <Annoucement />
        <Navbar />
        <Toolbar />
        <Title>
            Sản Phẩm Các Loại
        </Title>
        <FilerContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="sort">Sort</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
        </FilerContainer>        
        <ListProducts1 filters={filters} sort={sort}/>
        <Footer />
    </Container>
  )
}

export default ProductList