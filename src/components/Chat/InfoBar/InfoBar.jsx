import React, { useEffect,useState } from 'react';
import { Box, Avatar } from "@mui/material";

import onlineIcon from '../../../images/onlineIcon.png';
import closeIcon from '../../../images/closeIcon.png';

import './InfoBar.css';
import chatApi from '../../../api/Chat.tsx';
import productApi from '../../../api/Product.tsx';
import { Typography } from '@mui/material';

const InfoBar = ({ roomId }) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [thumbnail, setThumbnail] = useState('')

  useEffect(()=>{
    if(roomId != ""){
      chatApi.getProductId(roomId).then((data)=>{
        const productId = data.productId;
        productApi.getProductDetail(productId).then((data) => {
          if(data){
            console.log(data);
            setProductName(data.productName);
            setProductPrice(data.price);
            setThumbnail(data.thumbnail);
          }
        })
      })
  }
  }, [roomId])

  return(
    <Box className="infoBar">
      <Box className="leftInnerContainer">
        <Box sx={{display:'flex'}}>
          <Avatar sx={{ width:"45px", height:"45px", marginTop:'8px', backgroundColor:'lightgray', opacity:'0.8'  }} variant="square">
            <img style={{maxHeight:'100%'}}src={thumbnail} alt="깨짐"/>
          </Avatar>
          <Box sx={{marginLeft:'10px'}}>
            <Typography sx={{fontWeight:'500', fontSize:'20px', color:'black'}}>{productPrice} eth</Typography>
            <Typography sx={{fontWeight:'300', color:'black'}}>{productName}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="rightInnerContainer">
        <a href="/chat"><img src={closeIcon} alt="close icon" /></a>
      </Box>
    </Box>
)};

export default InfoBar;