import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Valid from '../validate/LoginValid'
import axios from 'axios'
import { useState } from 'react'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255,255,0.5), rgba(255, 255, 255, 0.5)),
  url("https://media.istockphoto.com/id/1220123561/vector/big-zero-waste-elements-set-eco-friendly-design-with-recyclable-and-reusable-products-zero.jpg?s=1024x1024&w=is&k=20&c=w8WZz5IxOXVP-rZK7yOSykiiGD1-iF10SFnM1XctiHQ=");
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Lab = styled.label`
    display: flex;
    justify-content: flex-start;
    text-align: left;
    margin-top: 12px;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 12px 10px 0px 0px;
  padding: 10px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 15px;
  position: relative;
  left: 150px;
`

const Linkk = styled.a`
    margin: 5px;
    color: gray;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
})

const navigate = useNavigate();

const [errors, setErrors] = useState({})

axios.defaults.withCredentials = true;
const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors(Valid(values));
    if(errors.email === "" && errors.password === ""){
        axios.post('http://localhost:8081/login', values)
        .then(res => {
          if(res.data.Status === "Success"){
              navigate('/');
          }else{
              alert(res.data.Message);
          }
      })
        .catch(err => console.log(err));
    }
}

const handleInput = (e)=>{
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
}
  return (
    <Container>
        <Wrapper>
          <Title> <b> Sign In </b> </Title>
          <Form action='' onSubmit={handleSubmit}>
            <Lab htmlFor='email'> Email: </Lab>
            <Input type='email' placeholder='Enter Email' name='email' onChange={handleInput}/>
            {errors.email && <span style={{color: "red"}}>{errors.email}</span>}
            <Lab htmlFor='password'> Password: </Lab>
            <Input type='password' placeholder='Enter Password' name='password' onChange={handleInput}/>
            {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
            <Button type='submit'> Login </Button>
            <Linkk> Forgot the password </Linkk>
            <Link to="/register"> <Linkk>Create a new account </Linkk></Link>
          </Form>
        </Wrapper>
    </Container>
  )
}

export default Login