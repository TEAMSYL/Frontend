
import React, { useEffect, useRef, useState } from "react";
import {TextField, Button, Box, Typography,MenuItem, Menu, Modal } from '@mui/material/';
import axios from 'axios'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { erc721Abi, erc721Address, web3} from "../erc721Contract.js";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

const NFTinfo = ({v, getForSaleToken, account}) => {
    const [nftDesc, setNftDesc] = useState("");
    const [nftName, setNftName] = useState("");
    const [image, setImage] = useState(null);
    const [nftPrice, setNftPrice] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [desModalOpen, setDesModalHandleOpen] = useState(false);
    const desModalHandleOpen = () => setDesModalHandleOpen(true);
    const desModalHandleClose = () => setDesModalHandleOpen(false);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const readNFTinfo = async () => {
        const res = await axios.get(v['tokenURI']);
        setNftName(res.data['name'])
        setNftDesc(res.data['description'])
        setNftPrice(v['tokenPrice'])
        setImage(res.data['image'])
    }

    const buyHandleOpen = async(_tokenId, _tokenPrice, e) => {
        try{
            if(!account)    return;
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
                from: account,
                });
            const res = await Erc721Contract.methods.purchaseToken(Number(_tokenId)).send({from: account, value: _tokenPrice});
            console.log(res);
            if(res.status){
                getForSaleToken();
            }
        }catch(error){
            console.log(error)
        }
    }   

    const chatHandleOpen = () => {
        // 소켓 추가후 수정
    }


    useEffect(() => {
        readNFTinfo();
      }, []);

    return (
        <Box sx={{height:'300px'}}>
            <Box>
                {image ? <img style={{width: 220, height: 220}} src={image} alt="image" /> : <DoDisturbAltIcon sx={{width:'100%', height:'100%'}}/>}
                <br/>
                {nftName}
                <br/>
                <span style={{fontSize:'20px',fontWeight:'800'}}>{web3.utils.fromWei(nftPrice)}</span> eth
                <br/>
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
                <MenuItem
                    onClick={() => {
                        buyHandleOpen(v['tokenId'], v['tokenPrice']);
                        setAnchorEl(null);
                    }}>Buy</MenuItem>
                <MenuItem
                    onClick={() => {
                        desModalHandleOpen();
                        setAnchorEl(null);
                    }}>Description</MenuItem>
                <MenuItem 
                    onClick={() => {
                        chatHandleOpen();
                        setAnchorEl(null);
                    }}>Chat</MenuItem>
            </Menu>
            </Box>
            <Modal
                open={desModalOpen}
                onClose={desModalHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{fontSize:'20px',fontStyle:'bold'}}>
                        이름 : {nftName}
                    </Typography>
                    <Typography sx={{fontSize:'20px',marginTop:'10px'}}>
                        설명 : {nftDesc}
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
};


export default NFTinfo;

