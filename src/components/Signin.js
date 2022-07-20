import { Box, Button, Stack, TextField, Typography, InputAdornment, createTheme, ThemeProvider, ButtonGroup  } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthApi from '../api/Auth';
import { useNavigate } from 'react-router-dom';

import React from 'react'
import { useDispatch } from 'react-redux';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF646B'
        }
    },
});

const resultTexts = [
    {
        text: '.',
        color: 'transparent'
    },
    {
        text: '아이디를 입력해주세요',
        color: '#FF003E',
    },
    {
        text: '비밀번호를 입력해주세요',
        color: '#FF003E'
    },
    {
        text: '아이디 혹은 비밀번호를 잘못 입력했습니다. 확인해주세요!',
        color: '#FF003E'
    }
];

const Signin = () => {
    const [ id, setId ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ resultText, setResultText ] = React.useState(resultTexts[0]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (id == '') {
            setResultText(resultTexts[1])
            return;
        } else if (password == '') {
            setResultText(resultTexts[2]);
            return;
        }

        // 입력 모두 완료된 경우 api를 통해 서버로 로그인 요청
        AuthApi.SignIn(
            {
                email: String(id),
                password: String(password),
            }
        ).then((response) => {
            console.log(response);
            if (response.status == 200) {
                dispatch({type: 'LOGIN'});
                navigate('/');
            } else {
                setResultText(resultTexts[3]);
            }
        })

    };

    const handleFindPassword = () => {
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    return (
        <ThemeProvider theme={theme}>
            <Box 
                display='flex'
                justifyContent='center'
                minWidth='1024px'
            >
                <Box width='1024px'>
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
                        >로그인</Typography>
                    </Box>
                    <Box
                    >
                        <Box 
                            display='flex'
                            flexDirection='column'
                            width='1024px'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Box
                                width='25vw'
                                display='flex'
                                minWidth='450px'
                                flexDirection='column'
                                alignItems='center'
                                padding='5vw 0 15vw'
                            >   
                                <AccountCircleIcon
                                    sx={{
                                        fontSize: '100px',
                                        position: 'relative',
                                        top: '50px',
                                        color: '#BABABA'
                                    }}
                                />
                                <Box
                                    border='1px solid #C6C6C6'
                                    borderRadius='10px'
                                    width='100%'
                                >   
                                    <Stack
                                        padding='50px 20px 20px'
                                    >   
                                        <TextField
                                            placeholder='아이디'
                                            type='text'
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <PersonOutlineIcon fontSize='medium' sx={{ color: '#BABABA' }}/>
                                                  </InputAdornment>
                                                ),
                                            }}
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                        <TextField  
                                            placeholder='비밀번호'
                                            type='password'
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <LockOpenIcon fontSize='small' sx={{ color: '#BABABA' }}/>
                                                  </InputAdornment>
                                                ),
                                            }}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Typography
                                            sx={{ 
                                                fontSize: '12px',
                                                margin: '20px 10px 15px',
                                                color: `${resultText.color}`
                                            }}
                                        >
                                            {resultText.text}
                                        </Typography>
                                        <Box width='100%'>
                                        <Button
                                            sx={{
                                                width: '100%',
                                                color: '#FFFFFF',
                                                backgroundColor: 'primary.main',
                                                '&:hover': {
                                                    backgroundColor: 'primary.main'
                                                }
                                            }}
                                            onClick={handleSubmit}
                                        >로그인</Button>
                                    </Box>
                                    </Stack>
                                </Box>
                                <Box
                                    display='flex'
                                    width='55%'
                                    justifyContent='space-between'
                                    marginTop='15px'
                                >
                                    <Button 
                                        disableTouchRipple
                                        onClick={handleFindPassword}
                                    >
                                        <Typography
                                            fontSize='14px'
                                            color='#888888'
                                        >
                                            비밀번호 찾기
                                        </Typography>     
                                    </Button>
                                    <Button 
                                        disableTouchRipple
                                        onClick={handleSignup}
                                    >
                                        <Typography
                                            fontSize='14px'
                                            color='#888888'
                                        >
                                            회원가입 하기
                                        </Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        
                    </Box>
                    
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Signin;