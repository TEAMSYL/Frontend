import {  IconButton, Box, Button, Modal, Stack, Typography, createTheme, ThemeProvider, TextField } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AuthApi from '../api/Auth';
import { useNavigate } from "react-router-dom";

const LoginModal = (props) => {
    const [ isLoginPage, setIsLoginPage ] = React.useState(false);
    const navigate = useNavigate();

    const Login = () => {
        return (
            <Stack
                component="form"
                onSubmit={handleSumit}
                sx={{  
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TextField
                    size="small"
                    id="email"
                    name="email"
                    label="email 주소"
                    autoComplete="email"
                    sx={{
                        width: '300px',
                        fontSize: '24px',
                    }}
                />
                <TextField
                    size="small"
                    name="password"
                    type="password"
                    id="password"
                    label="비밀번호"
                    autoComplete="current-password"
                    sx={{
                        width: '300px',
                        height: '30px',
                    }}
                />
                <Button
                    type="submit"
                    sx={{
                        width: '200px',
                        backgroundColor: '#D80C18',
                    }}
                >
                    로그인
                </Button>
            </Stack>
        );
    }

    const theme = createTheme({
        typography: {
            fontFamily: "Noto Sans CJK KR",
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableTouchRipple: "true",
                },
                styleOverrides: {
                    root: {
                        border: 0,  
                        '&:hover': {
                            border: '0',
                            backgroundColor: 'transparent',
                        },
                        fontFamily: "Noto Sans CJK KR",
                    },
                },
            },
        },
    });

    const handleSumit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email') === '') {
            alert('아이디를 입력해주세요.');
            return;
        } else if (data.get('password') === ''){
            alert('비밀번호를 입력해주세요.');
            return;
        }

        AuthApi.SignIn(
            {
                email: String(data.get("email")),
                password: String(data.get("password")),
            }
        ).then((data) => {
            console.log(data);
            if (data) {
                console.log("success!");
                navigate("/");
            } else {
                alert("일치하는 회원정보가 없습니다.");
            }
        })

        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const LoginModalBox = (props) => {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '420px',
                    height: '510px',
                    bgcolor: '#F7F7F7',
                    boxShadow: 5,
                    borderRadius: '5px',
                    paddingBottom: '30px',
                    }}
                > 
                    <IconButton
                        sx={{position: 'relative', top: '5px', left: '375px'}}
                        onClick={
                            ()=>{
                                    props.closeModal();
                                    setIsLoginPage(false);
                                }
                            }
                    >
                        <CloseIcon>
                        </CloseIcon>
                    </IconButton>
                    { isLoginPage ? 
                        <Login /> :
                        <Stack 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px',
                            }}
                            spacing={2}>
                            <StorefrontIcon fontSize={'large'} sx={{color: '#D80C18'}}></StorefrontIcon>
                            <Typography variant='h5'>블록마켓 시작하기</Typography>
                            <Typography variant='subtitle1'>간편가입으로 시작하세요!</Typography>
                            <Stack 
                                spacing={1}
                                sx={{ display: 'flex', alignItems: 'center'}}
                            >
                                <Button><img src={"/images/kakao_login.png"}/></Button>
                                <Button><img src={"/images/naver_login.png"}/></Button>

                                <Button 
                                    onClick={() => {
                                        navigate('/signin');
                                        props.closeModal();
                                    }} 
                                    sx={{width:'300px', height: '40px', backgroundColor:'#D80C18', color: '#FFFFFF'}}
                                >블록마켓으로 시작하기</Button>
                            </Stack>
                        </Stack>
                    }
                </Box>
            </ThemeProvider>
        );
    };

    const Bar = React.forwardRef((props, ref) => (
        <span {...props} ref={ref}>
            {props.children}
        </span>
    ));

    return (
        <Modal
                open={props.open}
                onClose={
                    () => {
                        props.closeModal();
                        setIsLoginPage(false);
                    }
                }
        >
                <Bar>
                    <LoginModalBox closeModal={props.closeModal}></LoginModalBox>
                </Bar>
        </Modal>
    );
}

export default LoginModal;