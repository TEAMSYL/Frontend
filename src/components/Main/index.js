import { Box } from '@mui/material';
import React from "react";
import AdCarousel from './AdCarousel';

const Main = () => {
    return (
        <>
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                width: "100vw",
            }}>
            <AdCarousel
                sx={{
                    width: 1024,
                    height: 300,
                }}>
            </AdCarousel>
        </Box>
        
        </>
    );
}

export default Main;