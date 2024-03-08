import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, Info } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { sliderItems } from "../dataSlide";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
`;

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
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    opacity: 0.75;
    z-index: 2;
`;

const Wrapper = styled.div `
    height: 100%;
    display: flex; 
    transform: translateX(${props=>props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`
const Slide = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;   
    background-color: #${props => props.bg};
`;
const ImgContainer = styled.div `
    flex: 1;
    height: 100%;
`;
const Image = styled.img `
    height: 80%;
    width: 45vw;
`;
const InforContainer = styled.div `
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1 `
    font-size: 70px;
`
const Description = styled.p`
    margin: 50px 0px;    
    font-size: 30px;
    letter-spacing: 3px;
    font-weight: 500;
`;
const Button = styled.button `
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex +1 : 0)
        }
    };
  return (
    <Container>
        <Arrow direction = "left" onClick={() => handleClick("left")}>
            <ArrowBackIosNewOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item) => ( 
            <Slide bg={item.bg} key={item.id_1}>
            <ImgContainer>
                <Image src = {item.img}/>
            </ImgContainer>
            <InforContainer>
                <Title> {item.title} </Title>
                <Description> {item.description} </Description>
            </InforContainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow direction = "right" onClick={() => handleClick("right")}>
            <ArrowForwardIosOutlined />
        </Arrow>
    </Container>
  )
}

export default Slider
