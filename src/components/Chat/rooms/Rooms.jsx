import React, { useState, useEffect, useRef } from "react";
import {Box} from "@mui/material";
import Room from './Room'


const Rooms = ({ rooms, name, nick }) => {
  return(
    <div>
      {rooms.map((room, i) => (
        <Box sx={{backgroundColor:'', border:'0.01px solid lightgray'}}key={i}>
          <Room room={room} name={name} nick={nick} />
        </Box>
      ))}
    </div>
  )
}

export default Rooms