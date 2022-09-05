import { Box, Avatar, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../../api/User.tsx';
import MystoreBody from './MystoreBody';
import MystoreBottom from './MystoreBottom';
const Mystore = ({ account }) => {
  const { userId } = useParams();
  const [isSame, setIsSame] = useState(false);

  useEffect(() => {
    userApi.getUser().then(data => {
      if (data.id != userId) {
        console.log('다른 사람 상점입니다.');
        setIsSame(false);
      } else {
        console.log('내 상점입니다.');
        setIsSame(true);
      }
    });
  }, [userId]);
  return (
    <Box>
      <MystoreBody userId={userId} isSame={isSame}></MystoreBody>
      <MystoreBottom
        userId={userId}
        account={account}
        isSame={isSame}
      ></MystoreBottom>
    </Box>
  );
};

export default Mystore;
