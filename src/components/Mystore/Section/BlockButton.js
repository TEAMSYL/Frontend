import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography,Button,Modal } from '@mui/material';
import { erc721Abi, erc721Address, web3} from "../../erc721Contract.js";
import { create } from 'ipfs-http-client'
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import background from '../../../images/blockbutton.png'
import storeApi from '../../../api/Store.tsx'
import userApi from '../../../api/User.tsx'
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const auth = 'Basic ' + Buffer.from(process.env.REACT_APP_INFURA_PROJECT_ID + ':' + process.env.REACT_APP_INFURA_PROJECT_SECRET).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: auth
    }
});

const BlockButton = ({userId, account}) => {
  
    const [nftDesc, setNftDesc] = useState("");
    const [nftName, setNftName] = useState("");
    const [image, setImage] = useState(null);
    const [storeName, setStoreName] = useState('');
    const [loading, setLoading] = useState(false);
    const canvas = useRef(null)
    const [userEmail, setUserEmail] = useState([]);
    const [storeButton, setStoreButton] = useState(0);
    const [storeSellCount, setStoreSellCount] = useState(0);
    const [ModalOpen, setModalOpen] = useState(false);
    const ModalHandleOpen = () => setModalOpen(true);
    const ModalHandleClose = () => setModalOpen(false);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const getStoreInfo = async() => {
      try{
          await userApi.getUser().then((response) => {
            const userData = response;
            console.log(userData)
            setUserEmail(userData.email);
            setStoreName(userData.nick);

          })
          await storeApi.getStoreInfo(userId).then((response) => {
              const storeData = response.data;
              setStoreButton(storeData.button);
              setStoreSellCount(storeData.sellCount);
          })
      } catch(error) {
          console.log(error);
      }
    };

    useEffect(()=> {
      getStoreInfo();
    }, [])

    useEffect(()=>{
      if(canvas){
          const ctx = canvas.current.getContext("2d");
          const cardImg = new Image();
          cardImg.src = background
          cardImg.onload = function(){
            ctx.drawImage(cardImg, 0, 0)
            ctx.font = "28px Fira"
            ctx.fillStyle = "lightcoral"
            ctx.textAlign = "center"
            ctx.fillText(storeName, 440, 220)

            ctx.font = "24px Fira"
            ctx.fillStyle = "lightcoral"
            ctx.textAlign = "center"
            ctx.fillText(userEmail, 440, 305)
          }
      }
    },[storeName,canvas])

    const setBlockButton = async(buttonData) => {
      try{
        await storeApi.setStoreButton(userId, buttonData);
      }catch(error){
        console.log(error)
      }
    }
    
    const handleClick = async() => {
      if(storeSellCount < 10) alert('아직 상품 판매 횟수가 10회 미만입니다.')
      else{
        setLoading(true);
        const data = document.getElementById('mycanvas');
        const dataurl = data.toDataURL();
        let json = `{"name":"${userEmail}","description":"${userEmail}님의 ${storeName} 상점에 대한 블록마켓 보증서입니다.","image":"${dataurl}","attributes":[{"trait_type": "Unknown","value": "Unknown"}]}`;
        
        const ipfsJson = await client.add(json);
        const JsonURL = process.env.REACT_APP_INFURA_PROJECT_GATEWAY + `ipfs/${ipfsJson.path}`;
        let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
            from: account,
          });
        let newTokenId = await Erc721Contract.methods.mintNFT(account, JsonURL, true).send();
        const tokenId = await Erc721Contract.methods.getCurrentTokenId().call();
        const buttonData = {button: tokenId};
        setBlockButton(buttonData)
        setLoading(false);  
        setStoreButton(tokenId);
        console.log(JsonURL);
      }
    }
    const readNFTinfo = async (v) => {
      const res = await axios.get(v);
      setNftName(res.data['name'])
      setNftDesc(res.data['description'])
      setImage(res.data['image'])
    } 
    const clickHandler = async() => {
        let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
          from: account,
        });
        const tokenURI = await Erc721Contract.methods.getTokenURI(storeButton).call();
        readNFTinfo(tokenURI);
        ModalHandleOpen();
        
    }




    return (
    <Box sx={{width:'1024px', margin: '0 auto 100px'}}>
      {(storeButton == 0) ? 
        <>
          <Box>
            <LoadingButton
              onClick={handleClick}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              블록버튼 받기
            </LoadingButton>
            <Typography sx={{marginTop:'10px',marginBottom:'12px'}} color={"black"} fontSize={"13px"}>
              상품 판매 횟수 10회 이상 일 때 신청가능합니다.
            </Typography>
            <Typography sx={{marginTop:'10px',marginBottom:'10px'}} color={"primary"} fontSize={"13px"}>
              당신의 상점명과 아이디를 가져오기 때문에 신중하게 선택해주세요 !<br/>
              아래 사진은 예시입니다.
            </Typography>
          </Box>
          <Box>
              <canvas
              id = "mycanvas"
              ref={canvas}
              width={640}
              height={366}
            />
          </Box>
      </>
      :
      <>
      <Box>
        <Typography sx={{marginTop:'10px',marginBottom:'10px'}} color={"primary"} fontSize={"13px"}>
            당신은 보증서를 가지고 있습니다 !
        </Typography>
        <Box sx={{display:'flex'}}>
          <Typography sx={{marginTop:'10px',marginBottom:'10px'}} color={"primary"} fontSize={"13px"}>
            명예의 전당에 당신의 상점이 올라갑니다.
          </Typography>
          <Button onClick={clickHandler} sx={{marginLeft:'50px',backgroundColor:'lightblue'}}>내 버튼 확인</Button>
        </Box>
      </Box>
        <Box>
            <canvas
            id = "bye"
            ref={canvas}
            width={0}
            height={0}
          />
        </Box>
      </>
      }

      <Modal
          open={ModalOpen}
          onClose={ModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <img src={image}></img>
          </Box>
      </Modal>
    </Box>
    )
};


export default BlockButton;