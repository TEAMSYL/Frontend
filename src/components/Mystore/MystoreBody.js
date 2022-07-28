import { Box, Avatar, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const MystoreBody = ()=>{

    const [editStoreIntroduction, setEditStoreIntroduction] = useState('');
    const [userInfoEdit, setUserInfoEdit] = useState(false);
    const [storeTitleEdit, setStoreTitleEdit] = useState(false);

    const IntroductionModifyHandler = () => {
        // 상태 변경 상태로
        setUserInfoEdit((prev) => !prev);
        // 소개글 수정
        setEditStoreIntroduction();
      };

    const TitleModifyHandler = () => {
        // 상태 변경 상태로
        setStoreTitleEdit((prev) => !prev);

    };

    const onSubmitStoreTitle = () => {
        // 상태 변경 상태로
        setStoreTitleEdit((prev) => !prev);
    }

    const onSubmitStoreDescription = () => {
        // 상태 변경 상태로
        setUserInfoEdit((prev) => !prev);
    }


    return (
        <Box style={{display:'flex', width:"1024px", height:"300px", margin:"0 auto", border:'1px solid #EEEEEE'}}>

                <Avatar sx={{ width:"300px", height:"100%" }} variant="square">
                    X
                </Avatar>
                <Box sx={{width:'724px'}}>
                    <TitleInfo>
                        <div>
                            {!storeTitleEdit ? (
                            <>
                                <Title>
                                    123
                                </Title>
                            </>
                            ):(
                            <>
                            <Box sx={{height:'100%', display:'flex'}}>
                                <Storetextarea>
                                </Storetextarea>
                                <StoreButton1 onClick={onSubmitStoreTitle}>확인
                                </StoreButton1>
                            </Box>
                            </>
                            )}
                        </div>

                    {!storeTitleEdit && (
                        <UserButton2 onClick={TitleModifyHandler}>상점명 수정</UserButton2>
                        )}
                    </TitleInfo>
                    <StoreInfo>
                        <StoreInfoBox1>
                            <StoreIcon color="secondary" sx={{fontSize: '20px', marginRight:'10px'}}></StoreIcon>
                            <InfoBoxText>상점오픈일 <span>? 일 전</span></InfoBoxText>
                        </StoreInfoBox1>
                        <StoreInfoBox>
                            <PersonIcon color="primary" sx={{fontSize: '20px', marginRight:'10px'}}></PersonIcon>
                            <InfoBoxText>상점방문수 <span>? 명</span></InfoBoxText>
                        </StoreInfoBox>
                        <StoreInfoBox>
                            <ShoppingBasketIcon color="success" sx={{fontSize: '20px', marginRight:'10px'}}></ShoppingBasketIcon>
                            <InfoBoxText>상품판매 <span>? 회</span></InfoBoxText>
                        </StoreInfoBox>
                        <StoreInfoBox>
                            <LocalShippingIcon sx={{fontSize: '20px', marginRight:'10px'}}></LocalShippingIcon>
                            <InfoBoxText>택배발송 <span>? 회</span></InfoBoxText>
                        </StoreInfoBox>
                    </StoreInfo>
                    {/* <IntroduceInfo>
                        123
                    </IntroduceInfo> */}
                    <div>
                        {!userInfoEdit ? (
                        <>
                            <IntroduceInfo>
                                상점 오픈 일 : 유저 create at 시간 가져오기<br/>
                                상점 방문 수 : ?<br/>
                                상품 판매 : 완료 횟수 추가<br/>
                                택배 발송 : 품목에 직거래 or 택배 발송 체크<br/>
                                소개글 or 상점명 or 프로필이미지 상점 DB 생성
                            </IntroduceInfo>
                        </>
                        ):(
                        <>
                        <Box sx={{height:'100%', display:'flex'}}>
                            <Usertextarea>
                            </Usertextarea>
                            <UserButton1 onClick={onSubmitStoreDescription}>확인
                            </UserButton1>
                        </Box>
                        </>
                        )}
                    </div>
                    <IntroduceBtn>
                        {!userInfoEdit && (
                        <UserButton2 onClick={IntroductionModifyHandler}>소개글 수정</UserButton2>
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
    align-items : center;
    margin-left: 30px;
    border-bottom: 1px solid #EEEEEE;
    width: 100%;
    height: 75px;
`;
const StoreInfo = styled.div`
    display: flex;
    margin-left: 30px;
    border-bottom: 1px solid #EEEEEE;
    width: 100%;
    height: 45px;
`;
const StoreInfoBox = styled.div`
    align-items : center;
    display: flex;
    height: 30px;
    margin-left: 20px
`;

const InfoBoxText = styled.div`
    font-size:14px;
    color: rgb(153, 153, 153);
    span
        {color: rgb(0, 0, 0);
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