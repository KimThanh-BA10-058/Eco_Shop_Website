import styled from "styled-components";
import { categories } from "../dataSlide";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-evenly;
`;
const Categories = () => {
  return (
    <Container>
        {categories.map(item => (
            <CategoryItem item = {item} key={item.id_2}/>
        ))}
    </Container>
  )
}

export default Categories