import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { brands } from "../dataSlide";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 200px;
    width: 85%;
    background-color: #c3c4c7;
    margin-left: 100px;
    padding: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
`
const Wrapper = styled.div `
    height: 100%;
    display: flex; 
    transform: translateX(${props=>props.brandIndex * -260}px);
    transition: all 1.5s ease;
`
const Square = styled.div`
    height: 110px;
    width: 100vw;
    margin-right: 35px; 
    margin-left: 15px; 
    background-color: white;
    display: flex;
    justify-content: center;
    padding: 20px;
    margin-top: 20px;
`
const Image = styled.img`
    width: 150px;
    height: 100px;
    cursor: pointer;
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top : 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "0px"};
    right: ${props => props.direction === "right" && "0px"};
    margin: auto;
    opacity: 0.75;
    z-index: 2;
`;

const Brand = () => {
    const [brandIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(brandIndex > 0 ? brandIndex-1 : 2)
        } else {
            setSlideIndex(brandIndex < 2 ? brandIndex +1 : 0)
        }
    };
    return(
    <Container>
        <Arrow direction = "left" onClick={() => handleClick("left")}>
            <ArrowBackIosNewOutlined />
        </Arrow>
        <Wrapper brandIndex={brandIndex}>
            {brands.map((item) => (
                <Square item={item}  key={item.id_5}>
                <Image src= {item?.img} />
                </Square>
            ))}           
        </Wrapper>
        <Arrow direction = "right" onClick={() => handleClick("right")}>
        <ArrowForwardIosOutlined />
    </Arrow>
    </Container>
)}
export default Brand;