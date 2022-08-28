import React, { useState, useEffect, useRef } from "react";
import './Message.css'
import ReactEmoji from 'react-emoji'
import { Box, flexbox } from "@mui/system";
import { VerticalAlignCenter } from "@mui/icons-material";
import userApi from "../../../../api/User.tsx"
const Message = ({ message: { text, user, sendTime, date, isRead }, name }) => {
  const [otherNick, setOtherNick] = useState('')
  let isSentByCurrentUser = false
  if(sendTime.length > 18){
    sendTime = sendTime.substr(11, 5)
  }else{
    sendTime = sendTime.substr(0, 5)
  }
  const trimmedName = name.trim().toLowerCase()
  if (user === trimmedName) {
    isSentByCurrentUser = true
  }else{
    userApi.getUserNick(user).then((data) => {
      if(data){
        setOtherNick(data);
      }
    })
  }

return isSentByCurrentUser ? (
  // user
  <div className='messageContainer justifyEnd'>
    <div className='msgBox'>
      <Box sx ={{
        display:"flex",
      }}>
        <div className='messageBox backgroundBlue'>
          <p className='messageText colorDark' dangerouslySetInnerHTML={ {__html: ReactEmoji.emojify(text)} }></p>
        </div>
      </Box>
      <p className='colorDark pl-10'>{sendTime}</p>
    </div>
  </div>
) : (
  // other
  <div className='messageContainer justifyStart'>
      <Box sx = {{
        display:"flex",
        flexDirection: "column"
      }}>
      <p className='sentText pr-10 '>{otherNick}</p>
      <div className='msgBox'>
      <Box sx ={{
        display:"flex"
      }}>
        <div className='messageBox backgroundLight'>
          <p className='messageText colorDark' dangerouslySetInnerHTML={ {__html: ReactEmoji.emojify(text)} }></p>
        </div>
        </Box>
        <p className='colorDark pr-10'>{sendTime}</p>
        
    </div>
    </Box>
  </div>
  
)}

export default Message