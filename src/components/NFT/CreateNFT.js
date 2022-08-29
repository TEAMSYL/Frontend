import React,{useState, useEffect} from 'react';
import { create } from 'ipfs-http-client'
import { useNavigate } from 'react-router-dom';
import { erc721Abi, erc721Address, web3} from "../erc721Contract.js";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Button, Typography, styled } from '@mui/material';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from 'axios'
const StyledBox = styled(Box)`
  font-size: 14px;
  width: 1024px;
  padding: 32px 0;
  border-bottom: 1px solid #dcdbe4;
`;
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
const CreateNFT = ({account, getAccount}) => {
    const [image, setImage] = useState(null);
    const [nftDesc, setNftDesc] = useState("");
    const [nftName, setNftName] = useState("");
    const [file, setFile] = useState(null);
    const [isMint, setIsMint] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onChange = async (e) => {
        const tmp = e.target.files[0];
        setFile(tmp);
        setImage(URL.createObjectURL(tmp));
      };
    useEffect(()=>{
        if(account == ""){
            getAccount();
        }
    },[account])

    const sendData = async () => {
        try {
            setLoading(true);
            const ipfsImg = await client.add(file);
            console.log(ipfsImg)
            // const ImgHash = "ipfs://" + ipfsImg.path;
            const ImgHash = process.env.REACT_APP_INFURA_PROJECT_GATEWAY + `ipfs/${ipfsImg.path}`
            // console.log(`${ipfsImg.path}`)
            // opensea에서 지원하는 metadata json형식
            
            let json = `{"name":"${nftName}","description":"${nftDesc}","image":"${ImgHash}","attributes":[{"trait_type": "Unknown","value": "Unknown"}]}`;
            const ipfsJson = await client.add(json);
            const JsonURL = process.env.REACT_APP_INFURA_PROJECT_GATEWAY + `ipfs/${ipfsJson.path}`;
            console.log(JsonURL)
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
                from: account,
              });
            let newTokenId = await Erc721Contract.methods.mintNFT(account, JsonURL, false).send();
            const name = await Erc721Contract.methods.name().call();
            const symbol = await Erc721Contract.methods.symbol().call();
            const totalSupply = await Erc721Contract.methods.totalSupply().call();
            console.log(name, symbol, totalSupply)
            setLoading(false);
            setIsMint(true);
            setTimeout(function(){
                alert('My NFT 페이지로 이동됩니다.')
                navigate('/mynft')
            }, 1000);
            
            
          } 
        catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    return (
        <Box>
            <Box
            sx={{
                width:'1024px',
                margin:'0 auto 100px',
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                <StyledBox
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "3px solid #1E1D29",
                    }}
                >
                    <Typography
                    sx={{
                        marginRight: "30px",
                        marginLeft: "5px",
                        color: "#212121",
                        fontSize: "26px",
                        fontWeight: 500,
                    }}
                    >
                    NFT 정보
                    </Typography>
                    <Typography sx={{}} color={"primary"} fontSize={"16px"}>
                    *필수항목
                    </Typography>
                </StyledBox>


                <Typography sx={{marginBottom: '10px', marginTop: '10px', fontStyle: 'bold'}} fontSize={"24px"} color={"#212121"}>Image*</Typography>

                <Box>
                    <label for="fileInput">
                    {image ? <img style={{width: 300, height: 300}} for="fileInput" src={image} alt="preview image" /> : <DoDisturbAltIcon sx={{width:'300px', height:'300px'}}/>}
                    </label>
                </Box>
                <label
                for="input-file"
                onChange={onChange}
                style={{ display: "inline-block", width: "115px", marginTop:'7px' }}
                >
                    <input
                        id="input-file"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        multiple
                    />
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "115px",
                        height: "35px",
                        backgroundColor: "#FAFAFD",
                        border: "1px solid #C3C2CC",
                        borderRadius: "6px",
                        "&:hover": {
                            cursor: "pointer",
                        },
                        }}
                    >
                        <CameraAltIcon sx={{ color: "#DCDBE4" }} />
                        <Typography fontSize={"13px"} sx={{ color: "#9B99A9" }}>
                        이미지 등록
                        </Typography>
                    </Box>
                </label>
                <Typography sx={{marginTop: '10px',marginBottom: '10px'}} fontSize={"24px"} color={"#212121"}>Name*</Typography>
                <TextField
                    style={{width: 600, marginTop: 10}}
                    id="demo-helper-text-misaligned"
                    label="Name"
                    onChange={(e) => {
                        setNftName(e.target.value);
                    }}
                />
                <Box>
                <Typography sx={{marginTop:'10px', marginBottom:'10px', fontStyle: 'bold'}} fontSize={"24px"} color={"#212121"}>Description*</Typography>

                <Box
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "800px",
                    }}
                >
                    <TextField
                    hiddenLabel
                    id="product-description"
                    size="small"
                    multiline
                    rows={6}
                    placeholder="NFT 설명을 입력해주세요."
                    onChange={(e) => {
                        setNftDesc(e.target.value);
                    }}
                    sx={{
                        width: "800px",
                    }}
                    />
                    <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        marginRight: "20px",
                        marginTop: "10px",
                    }}
                    >
                    </Typography>
                </Box>
            </Box> 
                <Box sx={{display: 'flex'}}>
                    <LoadingButton
                    sx={{width:'150px', marginTop: '15px', }}
                    onClick={sendData}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    >
                        NFT생성
                    </LoadingButton>
                    {isMint ? (
                    <Typography sx={{marginTop:'15px',marginLeft:'20px' ,fontSize: '25px'}}>
                        <ThumbUpAltIcon size="big" />
                        Completed Create!!
                    </Typography>
                    ) : (
                    ""
                    )}
                </Box>
            </Box>  
        </Box>
    );
    }
export default CreateNFT;