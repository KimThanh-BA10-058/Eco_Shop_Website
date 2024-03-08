import { Link } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
    margin: 3px;
    height: 70vh;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
const Title = styled.h1`
    color: black;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: 0.5px solid;
    padding: 10px;
    cursor: pointer;
    color: black;
    font-weight: 600;
    background-color: white;
`

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image src={item.img} />
        <Info>
            <Title>{item?.title}</Title>
            <Link to={item?.link} className='linkk'><Button>{item?.button}</Button></Link>
        </Info>
    </Container>
  )
}

export default CategoryItem