import { Box, MenuItem, Select, InputLabel, Container } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const  Top = () => {
    const [detal1, setDetail1] = React.useState('');
    const [detal2, setDetail2] = React.useState('');
    const [detal3, setDetail3] = React.useState('');

    const handleChange1 = (event) => {
        setDetail1(event.target.value);
    };
    const handleChange2 = (event) => {
        setDetail2(event.target.value);
      };
      const handleChange3 = (event) => {
        setDetail3(event.target.value);
      };


    return (
            <Box style={{ width: "1024px", margin:'0 auto', lineHeight: 1.4}}>
            <div style={{ display: "flex" }}>
                <HomeIcon sx={{fontSize:23}} />
                <div>홈</div>
                <ArrowForwardIosIcon sx={{margin:'3px', fontSize:18}}/>
                    <Select
                        sx ={{
                            width: '150px',
                            height:'25px',
                        }}
                        labelId="1"
                        value={detal1}
                        onChange={handleChange1}
                    >
                        <MenuItem value={10}>남성의류</MenuItem>
                        <MenuItem value={20}>여성의류</MenuItem>
                        <MenuItem value={30}>기타</MenuItem>
                </Select>

                <ArrowForwardIosIcon sx={{margin:'3px', fontSize:18}}/>
                <Select
                        sx ={{
                            width: '150px',
                            height:'25px',
                        }}
                        labelId="2"
                        value={detal2}
                        onChange={handleChange2}
                    >
                        <MenuItem value={10}>코트</MenuItem>
                        <MenuItem value={20}>셔츠</MenuItem>
                        <MenuItem value={30}>바지</MenuItem>
                </Select>
                <ArrowForwardIosIcon sx={{margin:'3px', fontSize:18}}/>
                <Select
                        sx ={{
                            width: '150px',
                            height:'25px',
                        }}
                        labelId="3"
                        value={detal3}
                        onChange={handleChange3}
                    >
                        <MenuItem value={10}>봄</MenuItem>
                        <MenuItem value={20}>여름</MenuItem>
                        <MenuItem value={30}>가을</MenuItem>
                </Select>
            </div>
            </Box>
      );
};

export default Top;