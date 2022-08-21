import React, { useState, useEffect, useRef } from "react";
import {Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Messages from './messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import chatApi from "../../api/Chat.tsx";
const v = 0;
const Chatviews = () => {
    const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const sc = useSelector( (state) => state.socket)
    const [socket, setSocket] = useState(null);
    const [reload, setReload] = useState(Number)
    const tmps = []

    useEffect(()=>{
      setSocket(sc)
    },[sc])

    useEffect(()=>{
      socket?.on('cntReload', (num)=>{
        setReload(num)
      })
    })
    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        if(room != "undefined"){
          setRoom(room);
          setName(name);
        }
      }, [location.search]);
    useEffect(() => {
      let bDate = ""
      let aDate = ""  
      setMessages([])
      chatApi.getChats(room, name).then((datas) => {
      // tmps = []
      if (datas) {
        for(let i = 0; i < datas.length; i++){
          (function(x){
            setTimeout(function(){
              var html = {"user":datas[i]["sender"], "text": datas[i]["message"], "sendTime": datas[i]["time"], "date": false, "isRead": datas[i]["isRead"]}
              aDate = datas[i]['time'].substr(0, 10)
              if(bDate != aDate){
                html['date'] = true;
                bDate = aDate
              }
              setMessages(messages => [ ...messages, html])
            }, 0.1)
          })(i)
        }
      }})
      
    }, [room]);

    useEffect(()=>{
        if(name != 'undefined'){
            socket?.emit('join', { name, room }, (error) => {
        if(error) {
            console.log(error);
          }
        });
      }
      },[room])
    useEffect(() => {
        socket?.on('new_message', message => {
          console.log("new_message")
          setMessages(messages => [ ...messages, message ]);
        });
    },[socket]);

      const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
          socket?.emit('sendMessage', message, () => setMessage(''));
      }
    }



    return (
        <Box sx={{height:'900px'}}>
            <InfoBar roomId={room} />
            <Messages messages={messages} name={name} />
            <Box>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </Box>
        </Box>
      );
    }
export default Chatviews;


