import React, { useState, useEffect, useRef } from "react";
import ChatIcon from '@mui/icons-material/Chat';
import {Box, Button, Stack, TextField, Typography } from "@mui/material";
import Room from './Room'
import { BoltOutlined } from "@mui/icons-material";


const RoomDefault = () => {
  return(
    <Box sx={{
      alignItems:'center',
      justifyContent:'center',
      display:'flex',
      height:'900px',
      border: '1px solid #dddddd'
    }}>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
      }}>
        <Box sx={{
          alignItems:'center',
          justifyContent:'center',
          display:'flex',
        }}>
          <ChatIcon sx={{
            fontSize:'80px',
            color:"gray"
            }}></ChatIcon>
        </Box>
        <Box sx={{fontStyle:'bold'}}>
          <b>대화방을 선택해주세요 !</b>
        </Box>
      </Box>
    </Box>
  )
}

export default RoomDefault