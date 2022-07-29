import { Box, Avatar, Button } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import userApi from '../../api/User.tsx';
import MystoreBody from './MystoreBody'
import MystoreBottom from './MystoreBottom'
const Mystore = ({ match })=> {
    const { userId } = useParams();

    return (
        <Box>
            <MystoreBody></MystoreBody>
            <MystoreBottom userId ={userId}></MystoreBottom>
        </Box>
    );
};

export default Mystore;