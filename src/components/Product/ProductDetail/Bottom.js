import { Box, Container, Avatar, InputLabel, FormControl, Stack } from '@mui/material';
import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from "styled-components";
const  Bottom = () => {

    return (
        <div>
            <Box sx={{width:'1024px', margin: '0 auto 100px', height: '235px'}}>
                <Box sx={{display: 'flex',alignItems: 'center', marginBottom:'30px', justifyContent: 'space-between'}}>
                    <div style={{display:'flex'}}>
                        <RelatedText>연관상품</RelatedText>
                    </div>
                </Box>
                <Box sx = {{display:'flex', margin:'0x auto 100px', width: '1024px'}}>
                    <ArrowBackIosNewIcon sx={{justifyContent: 'center',display: 'flex', fonsize: 18, opacity: 0.6, backgroundColor: '#f3f3f3', position: 'relative',top: '60px', left: '10px', border: 'none'}}></ArrowBackIosNewIcon>
                    <ImageBox1>
                        <Avatar sx={{ width:"155px", height:"159px" }} variant="square" alt='info'>
                            X
                        </Avatar>
                        <ImageText>언더마이카</ImageText>
                    </ImageBox1>
                    <ImageBox>
                        <Avatar sx={{ width:"155px", height:"159px" }} variant="square" alt='info'>
                            X
                        </Avatar>
                        <ImageText>마르지엘라 스치티 코트</ImageText>
                    </ImageBox>
                    <ImageBox>
                        <Avatar sx={{ width:"155px", height:"159px" }} variant="square" alt='info'>
                            X
                        </Avatar>
                        <ImageText>발렌시아가 코트</ImageText>
                    </ImageBox>
                    <ImageBox>
                        <Avatar sx={{ width:"155px", height:"159px" }} variant="square" alt='info'>
                            X
                        </Avatar>
                        <ImageText>블랭크룸 발마칸 코트 차콜</ImageText>
                    </ImageBox>
                    <ImageBox>
                        <Avatar sx={{ width:"155px", height:"159px" }} variant="square" alt='info'>
                            X
                        </Avatar>
                        <ImageText>cos 올 후드 코트46</ImageText>
                    </ImageBox>
                    <ImageBox>
                        <Avatar sx={{ width:"155px", height:"159px" }} variant="square" alt='info'>
                            X
                        </Avatar>
                        <ImageText>인사일런스 솔리스트 캐시미어 코트 블렉</ImageText>
                    </ImageBox>
                    <ArrowForwardIosIcon sx={{display: 'flex', fonsize: 18, opacity: 0.6, backgroundColor: '#f3f3f3', position: 'relative',top: '60px', right: '10px', border: 'none'}}></ArrowForwardIosIcon>
                </Box>

            </Box>
        </div>
      );
};


// const ArrowBackIosNewIcon = styled.button`
//     width: 50px;
//     padding: 20px;
//     height: 50px;
//     background: rgb(255, 255, 255);
//     opacity: 0.6;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position:relative;
//     top:60px;
//     left: 48px;
//     border:none;
// `;
const Buttonnext = styled.button`
    width: 50px;
    height: 50px;
    padding: 20px;
    background: rgb(255, 255, 255);
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
    top: 60px;
    right: 48px;
    border:none;
`;
const RelatedText = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #212121;
`;
const ImageBox1 = styled.div`
    width: 159px;
    margin-left: 0px;
`;

const ImageBox = styled.div`
    width: 159px;
    margin-left: 16px;
`;

const ImageText = styled.div`
    margin-top: 5px;
    width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    line-height: 1.4;
    font-size: 13px;
`;
export default Bottom;