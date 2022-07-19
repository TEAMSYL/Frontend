import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect } from "react";
import AdCarousel from './AdCarousel';
import Demo from './Demo';



const RowItem = (product) => {
    return (
        <Stack
            border='1px solid #E6E5EF'
        >
            <img 
                src='/images/img1.png'
                style={{ 
                    width: '195px',
                    height: '195px',
                    objectFit: 'contain',
                    borderBottom: '1px solid #E6E5EF',
                    backgroundColor: '#FAFAFD'
                }}
            />
            <Stack
                padding='15px 10px'
            >
                <Typography fontSize='14px' paddingBottom='20px'>제목</Typography>
                <Typography fontSize='16px' fontWeight='600'>100ETH</Typography>
            </Stack>
        </Stack>
    );
}
 
const Main = () => {
    return (
        <>
            <Stack
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    width: "100vw",
                }}
            >
                <AdCarousel
                    sx={{
                        width: 1024,
                        height: 300,
                    }}>
                </AdCarousel>
                <Demo/>
            </Stack> 
        </>
    );
}

export default Main;