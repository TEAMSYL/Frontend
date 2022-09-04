import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Box, Container, Avatar, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import ChatIcon from '@mui/icons-material/Chat';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import styled from 'styled-components';
import transactionApi from '../../../api/Transaction.tsx';
import chatApi from '../../../api/Chat.tsx';
import SimpleImageSlider from 'react-simple-image-slider';

const Body = ({ product, user }) => {
  //const location = useLocation();
  const navigate = useNavigate();
  const sc = useSelector(state => state.socket);
  const [socket, setSocket] = useState(null);
  const [createTime, setCreateTime] = useState('');
  const [openChat, setOpenChat] = useState(0);
  const [agoTime, setAgoTime] = useState(0);
  const [resTime, setResTime] = useState('');
  useEffect(() => {
    setSocket(sc);
  }, [sc]);
  useEffect(() => {
    if (product.id != undefined) {
      chatApi.getOpenChatCount(product.id).then(data => {
        setOpenChat(data);
      });
    }
  }, [createTime]);
  useEffect(() => {
    let createdTime = new Date(product['createdAt']);
    let currentTime = new Date();
    let storeTime = currentTime.getTime() - createdTime.getTime();
    setAgoTime(Number(storeTime) / 60000);
    setCreateTime(createdTime.toLocaleDateString());
  }, [product]);

  useEffect(() => {
    if (agoTime < 1) setResTime('몇 초 전');
    else if (agoTime < 60) setResTime(`${Math.floor(agoTime)}분 전`);
    else if (agoTime < 60 * 24)
      setResTime(`${Math.floor(agoTime / 60)}시간 전`);
    else if (agoTime < 60 * 24 * 30)
      setResTime(`${Math.floor(agoTime / 60 / 24)}일 전`);
    else if (agoTime < 60 * 24 * 365) setResTime(`몇 달 전`);
    else setResTime(`${Math.floor(agoTime / 60 / 24 / 365)}년 전`);
  }, [agoTime]);

  const handleChatRequet = async () => {
    if (user.id != 'undefined') {
      chatApi.findRoom(product.id, user.id).then(data => {
        // 방이 있다면
        if (data) {
          navigate(`/chat?room=${data['id']}&name=${user.id}`);
          // console.log(data);
        }
        // 방이 없다면
        else {
          //만들고
          chatApi.createRoom(product.sellerId, user.id, product.id).then(() => {
            console.log('chatload?');
            socket?.emit('chatReload');
          });
          chatApi.findRoom(product.id, user.id).then(data => {
            // 방이 있다면
            if (data) {
              navigate(`/chat?room=${data['id']}&name=${user.id}`);
            }
          });
        }
      });
    } else {
      console.log('로그인 필요!');
    }
  };

  const handleRequest = async () => {
    if (user == undefined) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const data = {
      productId: product.id,
      price: product.price,
    };
    const response = await transactionApi.request(data);
    if (response.status !== 200) {
      alert(response.data);
    } else if (response.status === 200) {
      alert('구매요청이 완료 되었습니다.');
    }
  };

  const handleMoveToMyProducts = () => {
    navigate(`/mystore/${user.id}`);
  };

  useEffect(() => {
    console.log('유저 props:', user);
  }, []);

  const Buttons = () => {
    if (user === undefined) {
      console.log('로그인 안함');
      return (
        <>
          <ContactBtn>연락하기</ContactBtn>
          <BuyBtn onClick={handleRequest}>구매요청</BuyBtn>
        </>
      );
    } else if (product.sellerId !== user.id) {
      console.log('로그인 했는데 내상품 아님');
      return (
        <>
          <ContactBtn onClick={handleChatRequet}>연락하기</ContactBtn>
          <BuyBtn onClick={handleRequest}>구매요청</BuyBtn>
        </>
      );
    } else {
      console.log('로그인 했고 내 상품');
      return (
        <MyProductsBtn onClick={handleMoveToMyProducts}>
          내 상품 관리
        </MyProductsBtn>
      );
    }
  };
  return (
    <Box style={{ width: '1024px', height: '490px', margin: '0 auto' }}>
      <Box
        sx={{
          display: 'flex',
          padding: '30px 0px;',
        }}
      >
        {product.ProductImgs ? (
          <SimpleImageSlider
            images={product.ProductImgs.map(img => img.imgUrl)}
            width="400px"
            height="400px"
            showBullets={true}
            showNavs={true}
          />
        ) : (
          ''
        )}
        <Info>
          <TitleInfo>
            <Title>{product.productName}</Title>
            <PriceBtn>
              <Pricing style={{ fontSize: '40px', fontStyle: 'bold' }}>
                {product.price}
                <span>ETH</span>
              </Pricing>
            </PriceBtn>
          </TitleInfo>
          <Grayinfo>
            <GrayLeft>
              <GrayBox>
                <ChatIcon sx={{ color: 'lightgray' }} />
                <Num>{openChat}</Num>
              </GrayBox>
              <GrayBox>
                <AccessAlarmsIcon sx={{ color: 'lightgray' }} />
                <Num>{resTime}</Num>
              </GrayBox>
              <GrayBox></GrayBox>
            </GrayLeft>
          </Grayinfo>
          <StateInfo>
            <Stack>
              <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <ListName>상품상태</ListName>
                <ListValue>중고</ListValue>
              </Box>
              <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <ListName>교환여부</ListName>
                <ListValue>교환불가능</ListValue>
              </Box>
              <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <ListName>생성날짜</ListName>
                <ListDelivery>{createTime}</ListDelivery>
              </Box>
              <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <ListName>거래지역</ListName>
                <ListValue>부산대학교</ListValue>
              </Box>
            </Stack>
          </StateInfo>
          <BottomInfo>
            <Buttons />
          </BottomInfo>
        </Info>
      </Box>
    </Box>
  );
};

const TitleInfo = styled.div`
  margin-left: 40px;
  border-bottom: 1px solid #eeeeee;
  width: 100%;
  height: 128px;
  padding-bottom: 5px;
`;

const Info = styled.div`
  width: 554px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 18px;
  font-weight: 600;
  line-height: 1.4;
`;
const PriceBtn = styled.div`
  width: 554px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Pricing = styled.div`
  font-size: 40px;
  font-weight: 600;
  span {
    margin-left: 10px;
    font-size: 28px;
    font-weight: 400;
  }
`;

const StateInfo = styled.div`
  width: 100%;
  margin-left: 40px;
`;
const ListName = styled.div`
  position: relative;
  color: rgb(153, 153, 153);
  font-size: 14px;
  padding-left: 15px;
  width: 90px;
  ::before {
    position: absolute;
    top: 7px;
    left: 6px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgb(204, 204, 204);
    content: '';
  }
`;

const ListValue = styled.div`
  color: #212121;
  font-size: 14px;
`;

const ListDelivery = styled.div`
  font-size: 14px;
  color: rgb(110, 71, 238);
`;

const BottomInfo = styled.div`
  margin-left: 40px;
  display: flex;
  justify-content: space-evenly;
  width: 554px;
  height: 56px;
  align-items: center;
`;

const ContactBtn = styled.button`
  background: rgb(255, 164, 37);
  border: 1px solid rgb(243, 150, 20);
  color: rgb(255, 255, 255);
  width: 100%;
  cursor: pointer;
  height: 56px;
  width: 250px;
  font-size: 18px;
  font-weight: 600;
  line-height: 20.7px;
  margin-right: 2px;
`;

const BuyBtn = styled.button`
  background: rgb(247, 0, 0);
  border: 1px solid rgb(223, 0, 0);
  color: rgb(255, 255, 255);
  width: 100%;
  cursor: pointer;
  height: 56px;
  width: 250px;
  font-size: 18px;
  font-weight: 600;
  line-height: 20.7px;
`;

const MyProductsBtn = styled.button`
  background: #ffa425;
  border: none;
  color: rgb(255, 255, 255);
  width: 100%;
  cursor: pointer;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  line-height: 20.7px;
  //   margin: 0 0 0 40px;
`;
const Grayinfo = styled.div`
  width: 554px;
  margin: 34px 0px 25px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GrayLeft = styled.div`
  display: flex;

  div::after {
    content: '';
    width: 1px;
    height: 12px;
    border-right: 1px solid rgb(238, 238, 238);
    margin: 0px 10px 0px 10px;
  }
  div:last-child::after {
    content: none;
  }
`;

const GrayBox = styled.div`
  display: flex;
  align-items: center;
  justify-contents: center;
`;

const Num = styled.span`
  font-size: 16px;
  margin-left: 5px;
  color: #cccccc;
`;
export default Body;
