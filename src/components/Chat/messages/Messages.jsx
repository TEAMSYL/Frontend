import React, { useState, useEffect, useRef } from "react";

import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './message/Message'

import './Messages.css'
const Messages = ({ messages, name }) => {



  return(
    
    <div className='messages'>
      {messages.map((message, i) => {
        if(message['date']){
          return ( <div key={i}>
                    <h4>{message['sendTime'].substr(0,10)}</h4>
                    <Message message={message} name={name} />
                  </div>)
        }
        return (<div key={i}>
                  <Message message={message} name={name} />  
                </div>)
        
      })}
    </div>
  )
}

export default Messages