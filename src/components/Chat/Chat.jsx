import {Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import chatApi from "../../api/Chat.tsx";
import userApi from "../../api/User.tsx";
import queryString from 'query-string';
import Rooms from './rooms/Rooms'
import Chatview from './Chatview'
import Roomdefault from './rooms/RoomDefault'
import './Chat.css';
const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState('')
  const sc = useSelector( (state) => state.socket)
  const [socket, setSocket] = useState(null);
  const [reload, setReload] = useState(false)
  const [nick, setNick] = useState('')
  useEffect(()=>{
    setSocket(sc)
  },[sc])


  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    console.log(room);
    if(room != "undefined"){
      setRoom(room);
      // 서버로 신호 보냄. 기존에 접속해있는 방이 있는지 확인 후 있다면 leave시키기
      socket?.emit('checkRoom', room);
    }

  }, [location.search]);

  useEffect(()=>{
    socket?.on('roomReload', ()=>{
      setReload(true)
    })
  })
 
  userApi.getUser().then((data) => {
    // console.log(data);
    if(data["id"] != "undefined"){
      setName(String(data["id"]));
      setNick(String(data['nick']))
    }

  });


  useEffect(() => {
      chatApi.getRooms(name).then((datas) => {
      setRooms([])
      if (datas) {
        for(let i = 0; i < datas.length; i++){
          (function(x){
            setTimeout(function(){
              var other = ""
              if(datas[i]["sellerId"] == name){
                other = datas[i]["buyerId"]
              }else{
                other = datas[i]["sellerId"]
              }
              var html = {'roomId' : datas[i]["id"], 'sellerId' : String(datas[i]["sellerId"]), 'buyerId' : String(datas[i]["buyerId"]), 'other':other, 'productId': Number(datas[i]["productId"])}
              setRooms(rooms => [...rooms,  html])
            }, 1)
          })(i)
        }
      }
      setReload(false)
    });
  }, [name, reload]);


  return (
    <Box sx={{
      width: '1024px',
      margin:'0 auto 100px',
      display:'flex',
      height:'900px'
    }}>
      <Box sx={{
        width:'512px',
        border: '1px solid #dddddd'}}>
        <Box>
            <h2 style={{margin:20}}>전체 대화</h2>
        </Box>
        <Box>
          <Stack spacing={1}>
            <Rooms rooms={rooms} name={name} nick={nick}/>
          </Stack>
        </Box>
      </Box>
      <Box sx={{width: '512px'}}>
        {
          room === undefined
          ? <Roomdefault></Roomdefault>
          :<Chatview></Chatview>
        }
      </Box>
    </Box>
  );
};

export default Chat;
