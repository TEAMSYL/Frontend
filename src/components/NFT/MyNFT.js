import React,{useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Typography, Box,Grid} from '@mui/material/';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import NFTinfo from './NFTinfo'
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


const MyNFT = ({account, getAccount}) => {
    const [arr, setArr] = useState(null);
    useEffect(()=>{
        if(account == ""){
            getAccount();
        }
    },[account])
    const getToken = async () => {
        try{
            let Erc721Contract = await new web3.eth.Contract(erc721Abi, erc721Address, {
                from: account,
              });
            const balanceLength = await Erc721Contract.methods.balanceOf(account).call();
            if(balanceLength == 0)  return;
            const tmpArr = [];
            const response = await Erc721Contract.methods.getTokens(account).call();

            response.map((v) => {
                tmpArr.push({
                    TokenId : v.TokenId,
                    TokenURI : v.TokenURI,
                    TokenPrice: v.TokenPrice,
                });
            });
            setArr(tmpArr);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getToken();
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
        My NFTs
        </Typography>

    </StyledBox>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        {arr && arr.map((v, i) => {
            return(
            <Grid key={i} item xs={3}>
                <Item>
                    <NFTinfo v={v} account={account} getToken={getToken}></NFTinfo>
                </Item>
            </Grid>
            )
        })}

    </Grid>
    
  </Box>
);
}
export default MyNFT;