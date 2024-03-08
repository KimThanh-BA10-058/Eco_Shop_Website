
import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Navbar from "../components/Navbar"
import Products2 from "../components/Products2"
import Footer from "../components/Footer"
import Toolbar from "../components/Toolbar"
import { useState } from "react"
import ListProducts2 from "../components/ListProducts2"

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

const ProductList2 = () => {
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
            Product
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
        <ListProducts2 filters={filters} sort={sort}/>
        <Footer />
    </Container>
  )
}

export default ProductList2;