import React from 'react'
import { Box, Container, Avatar, InputLabel, FormControl, Stack } from '@mui/material';

import styled from 'styled-components'
import BottomLeft from './BottomLeft'
import BottomRight from './BottomRight'

const DetailInfo = ({product}) => {


    return (
        <Box sx={{
            display:'flex',
            width: '1024px',
            margin: '0 auto 100px'
                    }}>
            <BottomLeft product={product}/>
            <BottomRight/>
        </Box>
    )
}

export default DetailInfo