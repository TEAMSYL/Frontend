import { Box, Button, ButtonGroup } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from "react";
import { useSelector } from 'react-redux';
import ApiAuth from '../api/Auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
                    fontSize: '13px',
                    border: 0,  
                    color: 'rgb(102 102 102)',
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



const Header = (props) => {
    //const [ isLogin, setIsLogin] = React.useState(sessionApi.isLogin());
    const { isLogin } = useSelector(state => state.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     if (sessionApi.isLogin()) {
    //         console.log('isLogin : true');
    //         setIsLogin(true);
    //     } else {
    //         console.log('isLogin : false');
    //         setIsLogin(false);
    //     }
    // })

    const handleLogout = () => {
        ApiAuth.SignOut().then((data) => {
            dispatch({type: 'LOGOUT'});
            navigate('/');
        })
    };

    return (
        <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            minWidth: 1024,
            height: 40,
            backgroundColor: '#FFFFFF',
            borderBottom: 1,
            borderColor: "#EDEDED",
          }}
        >
            <Box sx= {{
                display: "flex",
                justifyContent: "space-between",
                width: 1024,
                height: "100%",
            }}> 
                <ButtonGroup>
                    <Button startIcon={<DownloadIcon sx={{color: "#D80C18"}}/>}>앱다운로드</Button>
                    <Button 
                        onClick = {
                            () => {
                                alert("Ctrl + D를 누르시면 즐겨찾기에 추가됩니다!");
                            }
                        }
                        startIcon={<StarIcon sx={{color: "#E9B457"}}/>}
                    >
                        즐겨찾기
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    {isLogin ?
                        <Button onClick={handleLogout}>로그아웃</Button>:
                        <Button onClick={props.openModal}>로그인/회원가입</Button>
                    }
                    <Button
                        onClick={
                            isLogin ? 
                                ()=>{}:
                                props.openModal}>내 상점</Button>
                </ButtonGroup>
            </Box>
        </Box>
        </ThemeProvider>
      );
}

export default Header;