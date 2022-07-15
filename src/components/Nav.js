import React from "react";
import { ButtonGroup, Box, Button, Input } from "@mui/material";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChatIcon from '@mui/icons-material/Chat';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const searchBoxDefaultValue = "상품명 or 상점이름으로 검색하세요!";
const SERVICE_NAME = "블록마켓";

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    color: "#212121",
                    border: '0',
                    "&:hover": {
                        border: '0',
                        backgroundColor: 'transparent',

                    },
                    fontFamily: "Noto Sans CJK KR",
                },
            },
        },
    },
});

const Nav = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                width: "100vw",
                height: 150,
                minWidth: 1024,
                backgroundColor: "#FFFFFF",
                borderBottom: '1px #EDEDED solid'
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 1024,
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '150px',
                        paddingTop: '35px',}}>
                        <Box sx={{
                            display: 'flex',
                            height: "40px",
                            justifyContent: 'space-between', 
                            alignItem: "center"}}>
                            <Button href="/" sx={{color: "#D80C18", fontSize: "30px", fontWeight: 700}}startIcon={<CurrencyBitcoinIcon/>} disableTouchRipple>{SERVICE_NAME}</Button>
                            <Input 
                                endAdornment={<SearchIcon sx={{color: "#F72F33", ":hover":{cursor:"pointer"}}} onClick={()=>{}}/>} 
                                placeholder={searchBoxDefaultValue} disableTouchRipple
                                sx={{
                                    width: "460px",
                                    height: "40px",
                                    padding: "0 15px",
                                    border: "2px solid #F72F33",
                                    fontSize: "14px",
                                }} disableUnderline/>
                            <ButtonGroup>
                                <Button onClick={props.openModal} startIcon={<ArrowUpwardIcon />}>상품 등록</Button>
                                <Button onClick={props.openModal} startIcon={<StorefrontIcon />}>내 상점</Button>
                                <Button onClick={props.openModal} startIcon={<ChatIcon />}>채팅</Button>
                            </ButtonGroup>
                        </Box>
                        <Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
            
        </ThemeProvider>
    );
}

export default Nav;