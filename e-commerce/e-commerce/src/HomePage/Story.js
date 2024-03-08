import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Toolbar from '../components/Toolbar'

const Container = styled.div`
    background-color: #edfaef;
`
const Wrapper = styled.div`
    margin: 30px;
    display: flex;
    flex-direction: column;
    `
const Title = styled.h2`
    font-size: 25px;
`
const Content = styled.p`
    flex-direction: column;
    display: flex;
    text-align: left;
    font-size: 16px;
`

const Story = () => {
  return (
    <Container>
    <Navbar />
    <Toolbar />
    <Wrapper>
        <Title> Introduce About Eco Shop </Title>
        <br />
        <Content> Eco Shop offers quality, wholesome and local products from manufacturers in Vietnam - in the same spirit of reducing environmental and social impact in production. Eco Shop calls itself a grocery store of relaxation, hoping to be like a place that makes you feel warm when you step inside, quiet when you step out. Our products always focus on three core elements:
    </Content>
    <br/>
    <Content>
<b>✦ Safety</b> - The product should ensure zero or minimal chemical interference in all stages of production; manufacturers are interested in balancing the exploited material area.
</Content>
<Content>
<b>✦ Quanlity</b> - The product needs to be of good quality, delicious and distinctive; The finished product is neat and aesthetically pleasing.
</Content>
<Content>
<b>✦ Indigenousness</b> - To limit emissions, Eco Shop only selects products made in Vietnam and cares about the interests of local workers.
</Content>
<Content>
Eco Shop believes that the selection of products from eating, living to wearing is also closely related to environmental and social issues. Products that do not use chemicals will benefit both human health and nature. Hopefully, you will find in Eco Shop kind products: drink healthy, eat clean, wear green, ... to be gentle in both mental and physical health.
    </Content>
    </Wrapper>
    <Footer/>
    </Container>
  )
}

export default Story