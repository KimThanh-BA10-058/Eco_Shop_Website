import styled from "styled-components"

const Container = styled.div`
    height: 20px;
    background-color: brown;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;

const Annoucement = () => {
  return (
    <Container>
        Super Deal!!!!
    </Container>
  )
}

export default Annoucement