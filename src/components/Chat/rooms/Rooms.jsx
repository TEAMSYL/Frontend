import React, { useState, useEffect, useRef } from "react";

import Room from './Room'


const Rooms = ({ rooms, name, nick }) => {
  return(
    <div>
      {rooms.map((room, i) => (
        <div key={i}>
          <Room room={room} name={name} nick={nick} />
        </div>
      ))}
    </div>
  )
}

export default Rooms