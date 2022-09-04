import React, { useState, useEffect, useRef } from "react";
import { ButtonGroup, Box, Button, Input, Menu , MenuItem,Fade } from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ChatIcon from "@mui/icons-material/Chat";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";
import CategoryModal from "./Category/CategoryModal";
import chatApi from "../api/Chat.tsx";
import userApi from "../api/User.tsx";

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
          fontSize: "14px",
          color: "#212121",
          border: "0",
          "&:hover": {
            border: "0",
            backgroundColor: "transparent",
          },
          fontFamily: "Noto Sans CJK KR",
        },
      },
    },
  },
});

const Nav = (props) => {
  const { isLogin } = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = useState('');
  const sc = useSelector( (state) => state.socket)
  const [socket, setSocket] = useState(null);
  const [reload, setReload] = useState(Number)
  const [alarm, setAlarm] = useState(false)
  const open = Boolean(anchorEl);

  useEffect(()=>{
    setSocket(sc)
  },[sc])

  userApi.getUser().then((data) => {
    if(data["id"] != "undefined"){
      setName(String(data["id"]));
    }

  });

  useEffect(()=>{
    socket?.on('reload', (num)=>{
      setReload(num);
    })
  })

  useEffect(() => {
    chatApi.getLastCnt(Number(name)).then((data) => {
      if (data) {
        setAlarm(true);
      }else{
        setAlarm(false);
      }
    })
  }, [reload])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          height: 150,
          minWidth: 1024,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px #EDEDED solid",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: 1024,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "115px",
              paddingTop: "35px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "40px",
                justifyContent: "space-between",
                alignItem: "center",
              }}
            >
              <Button
                sx={{ color: "#D80C18", fontSize: "30px", fontWeight: 700 }}
                startIcon={<CurrencyBitcoinIcon />}
                onClick={() =>
                  navigate("/", { state: { searchKeyword: searchKeyword } })
                }
                disableTouchRipple
              >
                {SERVICE_NAME}
              </Button>
              <Input
                endAdornment={
                  <SearchIcon
                    sx={{ color: "#F72F33", ":hover": { cursor: "pointer" } }}
                    onClick={() =>
                      navigate("/search", {
                        state: { searchKeyword: searchKeyword },
                      })
                    }
                  />
                }
                placeholder={searchBoxDefaultValue}
                disableTouchRipple
                sx={{
                  width: "460px",
                  height: "40px",
                  padding: "0 15px",
                  border: "2px solid #F72F33",
                  fontSize: "14px",
                }}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
                disableUnderline
              />
              <ButtonGroup>
                <Button
                  onClick={() => {
                    if (isLogin == true) {
                      navigate("/products/regist");
                    } else {
                      props.openModal();
                    }
                  }}
                  startIcon={<ArrowUpwardIcon />}
                >
                  상품 등록
                </Button>
                <Button
                  onClick={() => {
                    if (isLogin == true) {
                      navigate("/transaction/manage/sell");
                    } else {
                      props.openModal();
                    }
                  }}
                  startIcon={<StorefrontIcon />}
                >
                  거래관리
                </Button>
                {(alarm)?(
                  <b style={{margin:'0px',position: "relative", top:'5px',left:'18px',width:'15px', height:'15px', borderRadius:'50%',
                  background:"red"}}>{alarm}
                  </b>   
                )
                :(
                  <b style={{visibility:'hidden', margin:'0px',position: "relative", top:'5px',left:'18px',width:'15px', height:'15px', borderRadius:'50%',
                  background:"red"}}>{alarm}
                  </b>   
                )}
                <Button
                  onClick={() => {
                    if (isLogin == true) {
                      navigate("/chat");
                    } else {
                      props.openModal();
                    }
                  }}
                  startIcon={<ChatIcon/>}
                >
                  채팅
                </Button>
                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    startIcon={<WallpaperIcon/>}
                >
                    NFT
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                    'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem 
                        onClick={() => {
                            if (isLogin == true) {
                                handleClose();
                                navigate('/mynft');
                            } else {
                                props.openModal();
                            }
                        }}>My NFT</MenuItem>  

                    <MenuItem
                            onClick={() => {
                                if (isLogin == true) {
                                    handleClose();
                                    navigate('/nft');
                                } else {
                                    props.openModal();
                                }
                            }}>Create</MenuItem>
                    
                    <MenuItem 
                            onClick={() => {
                                if (isLogin == true) {
                                    handleClose();
                                    navigate('/sellnft');
                                } else {
                                    props.openModal();
                                }
                            }}>Explore</MenuItem>
                </Menu>
              </ButtonGroup>
            </Box>
            <CategoryModal/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Nav;
