import { Box, Avatar, Button } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import MystoreBody from './MystoreBody'
import MystoreBottom from './MystoreBottom'
const Mystore = ()=>{
    const { userId } = useParams();
    console.log(userId)
    return (
        <Box>
            <MystoreBody></MystoreBody>
            <MystoreBottom userId ={userId}></MystoreBottom>
        </Box>
    );
};

export default Mystore;