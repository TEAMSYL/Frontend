import { Box } from '@mui/material';
import React from 'react';
import Header from './Header';
import Nav from './Nav';

const  Menu = (props) => {
    return (
        <Box sx={{position: "fixed", top: 0, zIndex: 10}}>
            <Header openModal={props.openModal} getAccount={props.getAccount}/>
            <Nav openModal={props.openModal}/>
        </Box>
    );
};

export default Menu;