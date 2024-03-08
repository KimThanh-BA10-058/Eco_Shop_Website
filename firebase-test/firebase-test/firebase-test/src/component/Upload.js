// src/components/Data.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Data = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileName, setFileName] = useState();
  const handleImageChange = (e) => {
    const filee = (e.target.files[0]);
        setSelectedFile(filee);
    };

  const handleClick=() =>{
    const formData = new FormData();   
    formData.append('product_pic', selectedFile);
    console.log(formData.get('imagee')) 
    axios.post('http://localhost:8081/upload-profile-pic', formData)
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      }); 
    }

  return (
    <div>
    <div>
        <label>Select your product picture:</label>
        <input type="file" name="product_pic" onChange={handleImageChange}/>
    </div>
    <div>
        <input type="button" onClick={handleClick} value="Upload" />
    </div>

    </div>
  );
};

export default Data;
