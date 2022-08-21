import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8001";

const sc = io(ENDPOINT);

function socketInfo(state = sc){
  return state;
}

export default socketInfo;