import { Box, Avatar, Button } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import userApi from '../../api/User.tsx';
import MystoreBody from './MystoreBody'
import MystoreBottom from './MystoreBottom'
const Mystore = ({ account })=> {
    const { userId } = useParams();

    React.useEffect(() => {   
    }, [userId]);
    
    return (
        <Box>
            <MystoreBody userId ={userId} account={account}></MystoreBody>
            <MystoreBottom userId ={userId} account={account}></MystoreBottom>
        </Box>
    );
};

export default Mystore;