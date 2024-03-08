import { AddShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
`;

const Container = styled.div`
    flex: 1;
    height: 30vh;
    position: relative;
    margin: 3px;
    min-width: 280px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    margin-top: 50px !important;
    &:hover ${Info}{
        opacity: 1;
    }
`;

const Icon = styled.div`
    width: 9%;
    height: 13%;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: gray;
        transform: scale(1.1);
    }
`;

const Image = styled.img`
    height: 75%;
    object-fit: cover;
    z-index: 2;
`;
const Name = styled.span`    
    font-size: 15px;
    font-weight: 500;
    z-index:3;
` 
const Price = styled.span`
    font-size: 15px;
    font-weight: 500;
    z-index:3;
`


const ProductItem3 = ({product}) => { 
    return (
    <div>
    <Container key={product?.id}>
            <Image src={product?.img } />  
            <Name>{product?.Name} </Name> 
            <Price> {product?.price}<sup>đ</sup></Price>
            <Info>
                <Icon><AddShoppingCartOutlined /> </Icon>
                <Link to={`/product3/${product?.id}`}><Icon> <SearchOutlined /> </Icon></Link>
            </Info>
    </Container>
    </div>
  )
}

export default ProductItem3;