import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  font-weight: bold;
  position: relative;
  width: 30%;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-width: 40%;
  flex: 1;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function UpdateInforUser() {
  const [id, setId] = useState("")
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
 
  const [cookies] = useCookies(['Uid','usernameUser', 'emailUser', 'phonenumberUser']);

  const savedId = cookies.Uid;

  console.log(cookies)
  console.log(savedId)
  useEffect(() => {
    const savedUsername = cookies.usernameUser;
    const savedEmail = cookies.emailUser;
    const savedPnum = cookies.phonenumberUser;
    
    if (savedUsername) {
      setUsername(savedUsername);
    }

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedPnum) {
      setPhonenumber(savedPnum);
    }

  }, [cookies]);
console.log(cookies.Uid)
  async function UpdateUserData(id) {

    const userData = {
      username: username,
      email: email,
      phonenumber: phonenumber
    };
    console.log(id)
    try {
      const response = await axios.post(`http://localhost:8081/updateUser/${id}`, userData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  return (
    <FormContainer>
      <Form>
        <h1>Update User Details</h1>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="firstName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phonenumber:</Label>
          <Input
            type="text"
            name="lastName"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button onClick={() => UpdateUserData(savedId)}>Update</Button>
      </Form>
    </FormContainer>
  );
}

export default UpdateInforUser;
