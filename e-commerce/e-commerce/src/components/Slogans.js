import { CheckOutlined, LocalShippingOutlined, SavingsOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import '../App.css';


const Container = styled.div`
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const Wrapper = styled.div`
    width: 300px;
    height: 90%;
    border: none;
    border-radius: 20px;
    box-shadow: 15px;
    display: flex;
    position: position;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 20px;
    color: ivory;
`
const Content = styled.p`
    font-size: 16px;
    font-weight: 500;
   margin-top: 50px;
   display: flex;
   color: ivory;
   justify-content: center;
`


const Slogans = () => {
  return (
    <Container>
        <Wrapper style={{backgroundColor: 'darkgreen'}} className='icon-slogan'>
            <Title> Nationwide Delivery</Title>
            <div style={{position:'relative', right:"100px"}}><CheckOutlined style={{color:'ivory'}}/></div>
            <Content> Fast - Convenient - Security</Content>
        </Wrapper>
        <Wrapper style={{backgroundColor: "darkolivegreen"}} className='icon-slogan'>
            <Title> Prestige and quality </Title>
            <div style={{position:'relative', right:"100px"}}><LocalShippingOutlined style={{color: "ivory"}}/></div>
            <Content> Easy to feedback </Content>
        </Wrapper>
        <Wrapper style={{backgroundColor: 'darkcyan'}} className='icon-slogan'>
            <Title> Saving Money </Title>
            <div style={{position:'relative', right:"100px"}}><SavingsOutlined style={{color: "ivory"}}/></div>
            <Content> Good Price - Good Product </Content>
        </Wrapper>
    </Container>
  )
}

export default Slogans