import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import {Box, Button, Stack, TextField, Typography, Avatar } from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";
import chatApi from "../../../api/Chat.tsx"
import productApi from "../../../api/Product.tsx"
import userApi from "../../../api/User.tsx"
const Room = ({ room : {roomId, sellerId, buyerId, other, productId}, name, nick }) => {
  const [reload, setReload] = useState(0)
  const sc = useSelector( (state) => state.socket)
  const [socket, setSocket] = useState(null);
  const [lastMsg, setLastMsg] = useState("");
  const [lastTime, setLastTime] = useState("");
  const [lastNotReadCnt, setLastNotReadCnt] = useState(0);
  const [nowRoom, setNowRoom] = useState(roomId)
  const [thumbnail, setThumbnail] = useState('')
  const [otherNick, setOtherNick] = useState('')
  useEffect(()=>{
    setSocket(sc)
  },[sc])
  useEffect(()=> {
    productApi.getProductDetail(productId).then((data) => {
      if(data){
        setThumbnail(data.thumbnail);
      }
    })
    userApi.getUserNick(other).then((data) => {
      if(data){
        setOtherNick(data);
      }
    })
  })

  useEffect(()=>{
    socket?.on('reload', (num)=>{
      setReload(num)
    })
  })

  
  useEffect(() => {
    chatApi.getLastChat(roomId).then((data) => {
        if(data['lastMsg'] != null){
          var lastS = data['lastSender']
          setLastMsg(data['lastMsg'])
          setLastTime(data['lastTime'].substr(0,5))
          if(lastS == other){
            setLastNotReadCnt(data['isReadCnt'])
          }
        }else{
          setLastMsg("최근 메세지가 없습니다")
        }
  })
  // setReload(false)
}, [reload]);
  return (
    // user
    <div>

      <Link
            style={{
              textDecorationLine: 'none'}}
            to={`/chat?room=${roomId}&name=${name}`}>
        <Box
          sx={{
            width: '100%',
            height: '80px',
            display: 'flex',
            backgroundColor:'lightblack',
            '&:hover': {
              backgroundColor: 'lightgray',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Box sx={{
            display: 'flex',
            margin:'5px',
            width: '500px',
            }}>
                <Avatar sx={{ width:"70px", height:"70px", backgroundColor:'lightgray', opacity:'0.6' }} variant="square">
                    <img style={{maxHeight:'100%'}}src={thumbnail} alt="깨짐"/>
                </Avatar>
            <Box sx ={{marginLeft:'5px'}}>
              <b style={{color:"black"}}>{otherNick}</b>
              {(lastNotReadCnt!=0)?(
                <Box sx={{width:'20px', height:'20px', borderRadius:'50%',
                background:"lightcoral", textAlign:'center',lineHeight:'20px',
                fontStyle:'bolder', float:'right', marginRight:'5px'}}>{lastNotReadCnt}
                </Box>                
              ):(
                <Box></Box>
              )}
              <Box sx ={{display:'flex',
            width: '430px',}}>
                <Box sx={{color:'black', marginTop:'8px'}}>{lastMsg}</Box>
                
              </Box>
              <Box sx={{float:'right', color:'black'}}>{lastTime}</Box>

            </Box>
          </Box>

        </Box>
      </Link>
    </div>
  )
}



export default Room