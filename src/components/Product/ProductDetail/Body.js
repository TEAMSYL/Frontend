import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Box, Container, Avatar, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "styled-components";
import productApi from '../../../api/Product.tsx';
import transactionApi from '../../../api/Transaction.tsx';
import userApi from '../../../api/User.tsx';

const Body = ({product, user}) => {
    //const location = useLocation();
    const navigate = useNavigate();

    const handleRequest = async () => {
        const data = {
            productId: product.id,
            price: product.price
        };
        const response = await transactionApi.request(data);
        if (response.status !== 200) {
            alert(response.data);
        } else if (response.status === 200) {
            alert('구매요청이 완료 되었습니다.');
        }
    };

    const handleModify = () => {
        navigate('/modify', { state: { product: product}});
    };

    useEffect(() => {
        console.log('유저 props:', user);
    }, []);
    
    return (
        <Box style={{width:"1024px", height:"490px", margin:"0 auto"}}>
            <Box sx={{
                    display: 'flex',
                    padding: '30px 0px;'
                }}>
                <Avatar sx={{ width:"428px", height:"428px" }} variant="square">
                    <img src={product.thumbnail}/>
                </Avatar>
                <Info>
                    <TitleInfo>
                        <Title>{product.productName}</Title>
                            <PriceBtn>
                                <Pricing  style={{fontSize:"40px", fontStyle: 'bold'}}>{product.price}<span>ETH</span></Pricing >
                            
                            </PriceBtn>
                    </TitleInfo>
                    <StateInfo>
                        생성 날짜 표시 예정<br/>
                        찜 추가 되면 하트 추가<br/>
                        게시글 방문 수?<br/>
                        <br/>
                    </StateInfo>
                    <StateInfo>
                        <Stack>
                            <Box sx={{display:"flex", marginBottom:"20px"}}>
                                <ListName>상품상태</ListName>
                                <ListValue>중고</ListValue>
                            </Box>
                            <Box sx={{display:"flex", marginBottom:"20px"}}>
                                <ListName>교환여부</ListName>
                                <ListValue>교환불가능</ListValue>
                            </Box>
                            <Box sx={{display:"flex", marginBottom:"20px"}}>
                                <ListName>배송비</ListName>
                                <ListDelivery>배송비 별도</ListDelivery>
                            </Box>
                            <Box sx={{display:"flex", marginBottom:"20px"}}>
                                <ListName>거래지역</ListName>
                                <ListValue>부산대학교</ListValue>
                            </Box>
                        </Stack>
                    </StateInfo>
                    <BottomInfo>
                        <HeartBtn>
                            <FavoriteIcon sx={{fontSize:'19px'}}></FavoriteIcon>
                            <Btngap>찜</Btngap>
                            <Btngap>2</Btngap>
                        </HeartBtn>
                        { (product.sellerId !== user.id) &&
                            <>
                                <ContactBtn>연락하기</ContactBtn>
                                <BuyBtn
                                    onClick={handleRequest}
                                >구매요청</BuyBtn>
                            </>
                        }
                        {
                            (product.sellerId === user.id) && <ModifyBtn onClick={handleModify}>수정하기</ModifyBtn>
                        }
                    </BottomInfo>
                </Info>
            </Box>
        </Box>
    );
};

const TitleInfo = styled.div`
    margin-left: 40px;
    border-bottom: 1px solid #EEEEEE;
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
    display:flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const Pricing = styled.div`
    font-size: 40px;
    font-weight: 600;
    span{
        margin-left: 10px;
        font-size: 28px;
        font-weight: 400;
    }
`;

const StateInfo = styled.div`
    width: 100%;
    margin-left: 40px;
`;
const Btngap = styled.span`
    margin-left: 5px;
`;
const ListName = styled.div`
    position: relative;
    color: rgb(153, 153, 153);
    font-size:14px;
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
        content: "";
    };
`;

const ListValue = styled.div`
    color: #212121;
    font-size:14px;
`;

const ListDelivery = styled.div`
    font-size:14px;
    color: rgb(110, 71, 238);
`;

const BottomInfo = styled.div`
    display:flex;
    justify-content: space-evenly;
    width: 554px;
    height: 56px;
    align-items: center;
`;


const HeartBtn = styled.button`
    background: rgb(204, 204, 204);
    color: rgb(255, 255, 255);
    border: none;
    width:100%;
    cursor: pointer;
    height: 56px;
    width: 179px;
    font-size: 18px;
    font-weight: 600;
    line-height: 20.7px;
    margin: 0px 10px 0px 40px;
`;

const ContactBtn = styled.button`
    background: rgb(255, 164, 37);
    border: 1px solid rgb(243, 150, 20);
    color: rgb(255, 255, 255);
    width:100%;
    cursor: pointer;
    height: 56px;
    width: 179px;
    font-size: 18px;
    font-weight: 600;
    line-height: 20.7px;
    margin-right: 10px;
`;

const BuyBtn = styled.button`
    background: rgb(247, 0, 0);
    border: 1px solid rgb(223, 0, 0);
    color: rgb(255, 255, 255);
    width:100%;
    cursor: pointer;
    height: 56px;
    width: 179px;
    font-size: 18px;
    font-weight: 600;
    line-height: 20.7px;
`;

const ModifyBtn = styled.button`
    background: rgb(204, 204, 204);
    border: 1px solid rgb(223, 0, 0);
    color: rgb(255, 255, 255);
    width:100%;
    cursor: pointer;
    height: 56px;
    width: 179px;
    font-size: 18px;
    font-weight: 600;
    line-height: 20.7px;
`;


export default Body;