
import React, { useEffect, useRef, useState } from "react";
import {TextField, Button, Box, Typography,MenuItem, Menu, Modal } from '@mui/material/';
import axios from 'axios'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { erc721Abi, erc721Address, web3} from "../erc721Contract.js";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ITEM_HEIGHT = 48;
const NFTinfo = ({v, getToken, account}) => {
    const [nftDesc, setNftDesc] = useState("");
    const [nftName, setNftName] = useState("");
    const [image, setImage] = useState(null);
    const [nftPrice, setNftPrice] = useState("");
    const [myPrice, setMyPrice] = useState(Number(v['TokenPrice']));
    const [sellModalOpen, setSellModalOpen] = useState(false);
    const [recipient, setRecipient] = useState('');
    const sellModalHandleOpen = () => setSellModalOpen(true);
    const sellModalHandleClose = () => setSellModalOpen(false);
    const [transferModalOpen, setTransferModalOpen] = useState(false);
    const transferModalHandleOpen = () => setTransferModalOpen(true);
    const transferModalHandleClose = () => setTransferModalOpen(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const readNFTinfo = async () => {
        const res = await axios.get(v['TokenURI']);
        setNftName(res.data['name'])
        setNftDesc(res.data['description'])
        setImage(res.data['image'])
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
        readNFTinfo();
      }, []);

    const cancelHandler = async(_tokenId) => {
        try{
            if(!account)    return;
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
                from: account,
              });
              const res = await Erc721Contract.methods.deleteSaleToken(Number(_tokenId)).send({from:account})
              if(res.status){
                setMyPrice(0);
            }
        }catch(error){
            console.log(error)
        }
    }

    const onClickTransfer = async(_tokenId) => {
        try{
            transferModalHandleClose();
            if(!account)    return;
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
                from: account,
              });
              const res = await Erc721Contract.methods.transferToken(Number(_tokenId), (recipient)).send({from:account})
            if(res.status){
                alert("전송 완료 되었습니다.")
            }
        }catch(error){
            console.log(error)
        }

    }

    const onClickHandler = async(_tokenId) => {
        try{
            sellModalHandleClose();
            if(!account)    return;
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
                from: account,
              });
            const res = await Erc721Contract.methods.setForSaleToken(Number(_tokenId), (nftPrice)).send({from:account})
            if(res.status){
                setMyPrice(Number(nftPrice));
            }
        }catch(error){
            console.log(error)
        }
    }
    // {web3.utils.fromWei(myPrice)
    return (
        <Box sx={{height:'320px'}}>
            {(myPrice != 0) ? (
                <Box sx={{display:'flex', textAlign: 'center', justifyContent: 'center'}}>
                <AccessibilityNewIcon sx={{fontSize: '30px',color: 'red'}} />
                <Typography sx={{marginLeft:'5px'}}>Sale : {myPrice * 0.000000000000000001} eth</Typography>
                </Box>
                ) : (
                <Box sx={{display:'flex', textAlign: 'center', justifyContent: 'center'}}>
                    <AccessibilityIcon sx={{fontSize: '30px',}} color="primary"/>
                    <Typography sx={{marginLeft:'5px'}}>Not Sale</Typography>
                </Box>
                )
            }
            <Box>
                <Box>
                    {image ? <img style={{width: 220, height: 220}} src={image} alt="image" /> : <DoDisturbAltIcon sx={{width:'100%', height:'100%'}}/>}
                    <br/>
                    <Typography sx={{fontStyle: 'bold'}} fontSize={"18px"}>{nftName}</Typography>
                </Box>
                <IconButton
                    sx={{
                        float: 'right',}}
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                    }}
                >

                    {(myPrice != 0) ? (
                        <MenuItem
                        onClick={() => {
                            cancelHandler(v.TokenId);
                            setAnchorEl(null);
                        }}>Sale Cancel</MenuItem>
                    ):(
                        <MenuItem
                        onClick={() => {
                            sellModalHandleOpen();
                            setAnchorEl(null);
                        }}>Sell</MenuItem>

                    )}
                    <MenuItem 
                        onClick={() => {
                            transferModalHandleOpen();
                            setAnchorEl(null);
                        }}>Transfer</MenuItem>
                </Menu>
            </Box>
            <Modal
                open={sellModalOpen}
                onClose={sellModalHandleClose}
            >
                <Box sx={style}>
                    <Typography sx={{fontSize:'27px'}}>
                        NFT의 가격을 기입해주세요.
                    </Typography>
                    <Typography sx={{marginBottom:'10px'}} color={"primary"} fontSize={"15px"}>
                        1 eth = 1000000000000000000 wei<br/>
                        <span style={{fontStyle:'bold'}}>wei 기준</span>으로 입력해주세요!
                    </Typography>
                    <Box sx={{display:'flex',}}>
                        <TextField
                            size="sm" 
                            sx={{}}
                            label="wei"
                            onChange={(e) => {
                                setNftPrice(e.target.value);
                            }}
                        />
                        <Button sx={{ marginLeft:'10px',marginTop:'5px', }} variant="outlined" onClick={(e)=>{onClickHandler(v.TokenId)}}>Sell</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={transferModalOpen}
                onClose={transferModalHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{fontSize:'27px'}}>
                        보낼 지갑 주소를 입력하세요.
                    </Typography>
                    <Typography sx={{marginBottom:'10px'}} color={"primary"} fontSize={"15px"}>
                        지갑 주소가 틀리면 NFT가 사라집니다.                       
                    </Typography>
                    <Box sx={{display:'flex',}}>
                        <TextField
                            size="sm" 
                            label="Account"
                            onChange={(e) => {
                                setRecipient(e.target.value);
                            }}
                        />
                        <Button sx={{ marginLeft:'10px',marginTop:'5px',}} variant="outlined" onClick={(e)=>{onClickTransfer(v.TokenId)}}>Transfer</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>

        
    );
};





export default NFTinfo;

