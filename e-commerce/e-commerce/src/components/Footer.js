import { Call, EmailOutlined, Facebook, Instagram, LocationOnOutlined, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components"
import myImage from '../image/eco1.png';

const Container = styled.div`
    display: flex;
    background-color: #B8F6FF;
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
    margin: 20px 0px;

`;
const SocialContainer = styled.div`
    display: flex; 

`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display:flex;
    align-items: center;

`



const Footer = () => {
  return (
    <Container> 
        <br />
        <Left>
            <Logo> <img src={myImage} style={{width: '113px', height: '114px'}}/> </Logo>
            <Desc> There are many variatios of passages, but the majority have suffed alteration.</Desc>
            <SocialContainer>
                <SocialIcon color="385999"> <Facebook/> </SocialIcon>
                <SocialIcon color="E4405F"> <Instagram/> </SocialIcon>
                <SocialIcon color="55ACEE"> <Twitter/> </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title> Userful Links </Title>
            <List>
                <ListItem><Link to="/" className='linkk'> Home</Link></ListItem>           
                <ListItem> Agaya</ListItem>
                <ListItem> AnEco</ListItem>
                <ListItem> Onatree</ListItem>
                <ListItem> TreViet</ListItem>
                <ListItem> Handmade</ListItem>
                <ListItem> ReusableBag</ListItem>
                <ListItem> Terms</ListItem>
                </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem> <LocationOnOutlined style={{marginRight: "10px"}}/> 62 Hoang Quoc Viet, Cau Giay, Ha Noi</ContactItem>
            <ContactItem> <Call style={{marginRight: "10px"}}/> +32 222 333 444 </ContactItem>
            <ContactItem> <EmailOutlined style={{marginRight: "10px"}}/> contact @gmail.com</ContactItem>
        </Right>
    </Container>
  )
}

export default Footer