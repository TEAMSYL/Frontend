import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const RegistProduct = () => {
    return (
        <Box>
            <div>상품 이미지</div>
            <div>제목</div>
            <div>거래 지역</div>
            <div>가격</div>
            <div>상품 설명</div>
            <div></div>
            <div>등록하기</div>
        </Box>
    );
};


const ManageProducts = () => {
    return (
        <div>ManageProducts</div>
    );
};


const Products = () => {
    return (
        <Box>
            <Box 
                sx={{
                    width: "1024px",
                }}
            >
                <Tabs>
                    <Tab label="상품 등록"></Tab>
                    <Tab label="상품 관리"></Tab>
                </Tabs>
            </Box>
            
            <div>test</div>
            <Outlet />
        </Box>
    );
};

export {Products, RegistProduct, ManageProducts};