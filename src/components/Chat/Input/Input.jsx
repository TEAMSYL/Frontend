import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import './Input.css'
import PhotoIcon from '@mui/icons-material/Photo';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { IconButton, Box, Button, Menu , MenuItem,Fade } from "@mui/material";

const Input = ({ setMessage, sendMessage, message }) => {
  const sc = useSelector( (state) => state.socket)
  const [sendValue, setSendValue] = useState('')
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    setSocket(sc)
  },[sc])

  const fileChangedHandler = (event) => {
    const formData = new FormData();
    const files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      formData.append('image', files[i])
    }
  
    uploadImgToServer({formData: formData})
  
  }
  const uploadImgToServer = async ({formData}) =>{
    try{
        const url = "http://localhost:8001/uploadImg"
        const config = {
          headers:{
            "content-type": "multipart/form-data"
          },
        };
  
        const res = await axios.post(url, formData, config)
        res.data.forEach(async (v) => {
          
          socket?.emit('sendMessage', v, () => false);
        })
        
      }catch(err){
      console.log(err)
    }
  }




  return(
  <form className='form'>
    <input
      className='input'
      type='text'
      placeholder='전송하려는 메세지를 입력하세요.'
      value={message}
      onChange={({ target: { value } }) => {
        setSendValue(value);
        setMessage(value);
      }}
      onKeyPress={
        (event) =>{
          if(event.key === 'Enter'){
            sendMessage(event)
            setSendValue('')
          }
        }
      }
    />
    {sendValue ? (
      <IconButton 
      sx={{backgroundColor:'lightcoral',borderRadius:'10px'}}
      size="large"
      className='sendButton' 
      onClick={(e) => {
        sendMessage(e)
        setSendValue('')
        }}>
          <SendIcon fontSize="100%"/>
      </IconButton >
    ) : 
    (
      <IconButton 
        sx={{backgroundColor:'lightcoral', borderRadius:'10px'}}
        className='sendButton'
        color="primary" aria-label="upload picture" component="label"
        onChange={fileChangedHandler}
        >
        <input hidden accept="image/*" type="file" />
        <PhotoIcon />
      </IconButton>
    )}
  </form>
)}

export default Input


