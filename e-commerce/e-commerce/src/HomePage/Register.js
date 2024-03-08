import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Validd from '../validate/RegisterValid'
import axios from 'axios'
import { useState } from 'react'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255,255,0.5), rgba(255, 255, 255, 0.5)),
  url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcw8nDy5nRULPWEePvacnFkEMktWakk7cQg&usqp=CAU");
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
  flex-wrap: wrap;
`
const Input = styled.input`
  min-width: 40%;
  margin: 12px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`
const Button = styled.button`
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left: 15px;
`

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    phonenumber:"",
    email: "",
    password: "",
  })

const navigate = useNavigate();

const [errors, setErrors] = useState({})

const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors(Validd(values));
    if(errors.username === "" && errors.phonenumber === "" && errors.email === "" && errors.password === ""){
        axios.post('http://localhost:8081/registerr', values)
        .then(res => {
            navigate('/login');
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
          <Title><b>Create an account </b> </Title>
          <form action='' onSubmit={handleSubmit}>
          <div>
            <Input placeholder="Enter username" type='text' name='username' onChange={handleInput}/> <br/>
            {errors.username && <span style={{color: "red"}}>{errors.username}</span>} 
          </div>
          <div>
            <Input type='email' placeholder='Enter Email' name='email' onChange={handleInput} /> <br/>
            {errors.email && <span style={{color: "red"}}>{errors.email}</span>}
          </div>
          <div>
            <Input type='text' placeholder='Enter Phonenumber' name='phonenumber' onChange={handleInput}/><br/>
            {errors.phonenumber && <span style={{color: "red"}}>{errors.phonenumber}</span>}
          </div>
          <div>
            <Input placeholder='Enter Password' name='password' onChange={handleInput} type='password'/><br/>
            {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
          </div>
            <br/>
            <Button style={{width: "150px" }} type='submit'> Create </Button>
          </form>
        </Wrapper>
    </Container>
  )
}

export default Register