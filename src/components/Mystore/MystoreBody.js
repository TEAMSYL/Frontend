import { Box, Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import pigAfter from '../../images/Pig_after.png';
import pigBefore from '../../images/Pig_before.png';
import userApi from '../../api/User.tsx';
import storeApi from '../../api/Store.tsx';
const MystoreBody = ({ userId, isSame }) => {
  const [storeName, setStoreName] = useState('');
  const [storeIntroduce, setStoreIntroduce] = useState('');
  const [storeCreateTime, setStoreCreateTime] = useState('');
  const [storeSellCount, setStoreSellCount] = useState(0);
  const [storeButton, setStoreButton] = useState(0);
  const [editStoreTitle, setEditStoreTitle] = useState('');
  const [editStoreIntroduction, setEditStoreIntroduction] = useState('');
  const [userInfoEdit, setUserInfoEdit] = useState(false);
  const [storeTitleEdit, setStoreTitleEdit] = useState(false);

  const getStoreInfo = async () => {
    try {
      await userApi.getUserNick(userId).then(response => {
        setStoreName(response);
      });

      await storeApi.getStoreInfo(userId).then(response => {
        const data = response.data;
        console.log(data);
        setStoreIntroduce(data.introduce);
        setStoreSellCount(data.sellCount);
        setStoreButton(data.button);
        let createdTime = new Date(data.createdAt);
        let currentTime = new Date();
        let storeTime = currentTime.getTime() - createdTime.getTime();
        setStoreCreateTime(storeTime / 1000 / 60 / 60 / 24);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setStoreInfo = async data => {
    try {
      await storeApi.setStoreInfo(userId, data);
    } catch (error) {
      console.log(error);
    }
  };

  const setStoreTitle = async data => {
    try {
      await userApi.setUserNick(userId, data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoreInfo();
  }, [userId]);

  const IntroductionModifyHandler = () => {
    setUserInfoEdit(prev => !prev);
  };

  const TitleModifyHandler = () => {
    setStoreTitleEdit(prev => !prev);
  };

  const onSubmitStoreTitle = () => {
    // 상태 변경 상태로
    // 닉네임 변경 추가
    const data = { nick: editStoreTitle };
    console.log(data);
    setStoreName(editStoreTitle);
    setStoreTitle(data);
    setStoreTitleEdit(prev => !prev);
  };

  const onSubmitStoreDescription = () => {
    // 상태 변경 상태로
    const data = {
      sellCount: storeSellCount,
      introduce: editStoreIntroduction,
      createAt: storeCreateTime,
    };
    setStoreIntroduce(editStoreIntroduction);
    setStoreInfo(data);
    setUserInfoEdit(prev => !prev);
  };

  return (
    <Box
      style={{
        display: 'flex',
        width: '1024px',
        height: '300px',
        margin: '0 auto',
        border: '1px solid #EEEEEE',
      }}
    >
      {storeButton != 0 ? (
        <Avatar
          src={pigAfter}
          sx={{ width: '300px', height: '100%' }}
          variant="square"
        />
      ) : (
        <Avatar
          src={pigBefore}
          sx={{ width: '300px', height: '100%' }}
          variant="square"
        />
      )}

      <Box sx={{ width: '724px' }}>
        <TitleInfo>
          <div>
            {!storeTitleEdit ? (
              <>
                <Title>{storeName}</Title>
              </>
            ) : (
              <>
                <Box sx={{ height: '100%', display: 'flex' }}>
                  <Storetextarea
                    onChange={e => {
                      setEditStoreTitle(e.target.value);
                    }}
                  />
                  <StoreButton1 onClick={onSubmitStoreTitle}>확인</StoreButton1>
                </Box>
              </>
            )}
          </div>

          {isSame && !storeTitleEdit && (
            <UserButton2 onClick={TitleModifyHandler}>상점명 수정</UserButton2>
          )}
          {storeButton != 0 ? (
            <Box sx={{ marginLeft: 'auto', marginRight: '10px' }}>
              <Typography sx={{ color: 'red' }}>
                <CheckCircleIcon sx={{ fontSize: '17px' }} /> 버튼보유
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </TitleInfo>
        <StoreInfo>
          <StoreInfoBox1>
            <StoreIcon
              color="secondary"
              sx={{ fontSize: '20px', marginRight: '10px' }}
            ></StoreIcon>
            <InfoBoxText>
              상점오픈일 <span>{parseInt(storeCreateTime)} 일 전</span>
            </InfoBoxText>
          </StoreInfoBox1>
          <StoreInfoBox>
            <ShoppingBasketIcon
              color="success"
              sx={{ fontSize: '20px', marginRight: '10px' }}
            ></ShoppingBasketIcon>
            <InfoBoxText>
              상품판매 <span>{storeSellCount} 회</span>
            </InfoBoxText>
          </StoreInfoBox>
          {/* <StoreInfoBox>
                            <LocalShippingIcon sx={{fontSize: '20px', marginRight:'10px'}}></LocalShippingIcon>
                            <InfoBoxText>택배발송 <span>? 회</span></InfoBoxText>
                        </StoreInfoBox> */}
        </StoreInfo>
        <div>
          {!userInfoEdit ? (
            <>
              {storeIntroduce == '' ? (
                <IntroduceInfo></IntroduceInfo>
              ) : (
                <IntroduceInfo>{storeIntroduce}</IntroduceInfo>
              )}
            </>
          ) : (
            <>
              <Box sx={{ height: '100%', display: 'flex' }}>
                <Usertextarea
                  onChange={e => {
                    setEditStoreIntroduction(e.target.value);
                  }}
                />
                <UserButton1 onClick={onSubmitStoreDescription}>
                  확인
                </UserButton1>
              </Box>
            </>
          )}
        </div>
        <IntroduceBtn>
          {isSame && !userInfoEdit && (
            <UserButton2 onClick={IntroductionModifyHandler}>
              소개글 수정
            </UserButton2>
          )}
        </IntroduceBtn>
      </Box>
    </Box>
  );
};

const Title = styled.div`
    align-items : center;
    font-style: bold
    font-size: 18px;
    font-weight: 600; 
    height: 20px;
    margin-right: 10px;
`;
const TitleInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  border-bottom: 1px solid #eeeeee;
  width: 693px;
  height: 75px;
`;
const StoreInfo = styled.div`
  display: flex;
  margin-left: 30px;
  border-bottom: 1px solid #eeeeee;
  width: 693px;
  height: 45px;
`;
const StoreInfoBox = styled.div`
  align-items: center;
  display: flex;
  height: 30px;
  margin-left: 20px;
`;

const InfoBoxText = styled.div`
  font-size: 14px;
  color: rgb(153, 153, 153);
  span {
    color: rgb(0, 0, 0);
    font-size: 14px;
    font-weight: 600;
  }
`;
const IntroduceInfo = styled.div`
  margin-left: 30px;
  width: 100%;
  height: 120px;
`;
const IntroduceBtn = styled.div`
  margin-left: 30px;
  width: 100%;
  height: 60px;
`;

const StoreInfoBox1 = styled(StoreInfoBox)`
  margin-left: 0px;
`;

const Storetextarea = styled.textarea`
  resize: none;
  width: 250px;
  float: left;
  border: 1px solid #eeeeee;
  outline: none;
  height: 25px;
`;

const StoreButton1 = styled.button`
  height: 30px;
  border: 1px solid #eeeeee;
  border-width: 1px 1px 1px 0;
  font-size: 15px;
  float: left;
  display: inline-block;
  width: 50px;
`;
const Usertextarea = styled.textarea`
  margin-left: 30px;
  resize: none;
  width: 540px;
  float: left;
  border: 1px solid #eeeeee;
  outline: none;
  height: 114px;
`;

const UserButton1 = styled.button`
    height: 120px;
    border: 1px solid #eeeeee;
    border-width: 1px 1px 1px 0;
    font-size: 15px;s
    float: left;
    display: inline-block;
    width: 100px;
`;

const UserButton2 = styled.button`
  // margin-left: 10px;
  font-size: 11px;
  color: #999999;
  border: 1px solid #eeeeee;
  background-color: #ffffff;
  cursor: pointer;
`;
export default MystoreBody;
