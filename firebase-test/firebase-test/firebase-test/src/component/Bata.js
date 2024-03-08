import { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";

export default function Bata() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  
  async function handleSubmit(e){
    e.preventDefault(); 
    console.log('xy')
    
    const formData = new FormData()
    formData.append("image", file)
    formData.append("description", description)
    const result = axios.post('http://localhost:8081/uploadimages', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    
    console.log("submitting"); 
}
  const submit = async event => {
    console.log('xy')
    
    const formData = new FormData()
    formData.append("image", file)
    formData.append("description", description)
    const result = await axios.post('/uploadimages', formData, { headers: {'Content-Type': 'multipart/form-data'}})

  }

  return (
    <div>
      <form>
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])}
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}