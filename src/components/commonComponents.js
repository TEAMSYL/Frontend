import { Box, Typography } from '@mui/material';
import React from 'react';

export const ContentNameSection = ({name}) => {
    return (
        <Box sx={{ padding: '32px 0', borderBottom: '3px solid #1E1D29', display: 'flex', alignItems: 'center'}}>
            <Typography
                sx={{
                    display: 'inline-block',
                    marginRight: '30px',
                    marginLeft: '5px',
                    color: '#212121',
                    fontSize: '26px',
                    fontWeight: 500,
                }}
            >{name}</Typography>
        </Box>
    );
};