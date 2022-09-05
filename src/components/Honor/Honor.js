import {
  Avatar,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  styled,
  Box,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { erc721Abi, erc721Address, web3 } from '../erc721Contract.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
const StyledBox = styled(Box)`
  font-size: 14px;
  width: 1062px;
  padding: 32px 0;
  border-bottom: 1px solid #dcdbe4;
`;
const Honor = ({}) => {
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  const getHonerTokens = async () => {
    try {
      let Erc721Contract = await new web3.eth.Contract(
        erc721Abi,
        erc721Address,
        {},
      );
      const onHonerLength = await Erc721Contract.methods
        .getOnHonerTokenArrayLength()
        .call();
      console.log(onHonerLength);
      const response = await Erc721Contract.methods.getHonerTokens().call();
      console.log(response);
      const tmp = [];
      response.map(async v => {
        const res = await axios.get(v.TokenURI);
        const data = res.data;
        tmp.push({
          title: `${data.name} 상점 보증서`,
          img: data['image'],
          author: data['name'],
          userId: data['userId'],
        });
      });
      setTimeout(() => {
        if (tmp.length != 0) {
          setItemData(tmp);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHonerTokens();
  }, []);

  const clickHander = (id, e) => {
    navigate(`/mystore/${id}`);
  };
  return (
    <Box sx={{ width: 1070, margin: '0 auto 100px' }}>
      <StyledBox
        sx={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '3px solid #1E1D29',
          marginBottom: '20px',
        }}
      >
        <Typography
          sx={{
            marginRight: '30px',
            marginLeft: '5px',
            color: '#212121',
            fontSize: '30PX',
            fontWeight: 1000,
          }}
        >
          <MilitaryTechIcon sx={{ fontSize: '30px' }} />
          명예의 전당
          <MilitaryTechIcon sx={{ fontSize: '30px' }} />
        </Typography>
      </StyledBox>
      <ImageList sx={{ width: 1070, height: 640, margin: '0 auto 100px' }}>
        {itemData &&
          itemData.map((item, i) => (
            <ImageListItem key={i} onClick={e => clickHander(item.userId, e)}>
              <Avatar
                src={item.img}
                sx={{ width: '520px', height: '316px' }}
                alt={item.title}
                variant="square"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={
                  <Typography sx={{ fontSize: '8px' }}>
                    by: {item.author}
                  </Typography>
                }
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};
export default Honor;
