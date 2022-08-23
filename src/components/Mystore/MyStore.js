import { Box, Avatar, Button } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import userApi from '../../api/User.tsx';
import MystoreBody from './MystoreBody'
import MystoreBottom from './MystoreBottom'
const Mystore = ({ account })=> {
    const { userId } = useParams();

    return (
        <Box>
            <MystoreBody userId ={userId}></MystoreBody>
            <MystoreBottom userId ={userId} account={account}></MystoreBottom>
        </Box>
    );
};

export default Mystore;