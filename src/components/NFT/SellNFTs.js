import React,{useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Button, Box, Typography,Grid} from '@mui/material/';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import SellNFTinfo from './SellNFTinfo'
import { erc721Abi, erc721Address, web3} from "../erc721Contract.js";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const StyledBox = styled(Box)`
  font-size: 14px;
  width: 1024px;
  padding: 32px 0;
  border-bottom: 1px solid #dcdbe4;
`;



const SellNFTs = ({account, getAccount}) => {
    const [arr, setArr] = useState(null);
    const [myPrice, setMyPrice] = useState(0);
    const [isSelling, setIsSelling] = useState(true);
    useEffect(()=>{
        console.log(account)
        if(account == ""){
            getAccount();
        }
    },[account])
    const getForSaleToken = async () => {
        try{
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
              });
            const onSaleLength = await Erc721Contract.methods.getOnSaleTokenArrayLength();
            const tmpArr = [];
            const response = await Erc721Contract.methods.getSaleTokens().call();
            response.map((v) => {
                tmpArr.push({
                    tokenId : v.TokenId,
                    tokenURI : v.TokenURI,
                    tokenPrice: v.TokenPrice,
                });
            });
            setArr(tmpArr);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getForSaleToken(); 
      }, []);


    return (
    <Box sx={{
        width:'1024px',
        margin:'0 auto 100px',
        }}>
        <StyledBox
        sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "3px solid #1E1D29",
        marginBottom: '20px'
        }}
        >
            <Typography
            sx={{
                marginRight: "30px",
                marginLeft: "5px",
                color: "#212121",
                fontSize: "30PX",
                fontWeight: 500,
            }}
            >
            판매중인 NFTs
            </Typography>

        </StyledBox>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        {arr && arr.map((v, i) => {
            return(
            <Grid key={i} item xs={3}>
                <Item>
                    <SellNFTinfo v={v} getForSaleToken ={getForSaleToken} account={account}></SellNFTinfo>
                </Item>
            </Grid>
            )
        })}

    </Grid>
    {(arr && arr.length == 0) ? (<Box>판매중인 NFT가 없습니다.</Box>):(<></>)}
  </Box>
);
}
export default SellNFTs;