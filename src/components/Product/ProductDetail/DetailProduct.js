import React, { useState, useEffect } from "react";
import { Box, Container, Avatar, InputLabel, FormControl, Stack } from '@mui/material';
import { useParams } from "react-router-dom";
import DetailInfo from './DetailInfo'
import Top from './Top'
import Bottom from './Bottom'
import Body from './Body'
import productApi from '../../../api/Product.tsx'
const DetailProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
      const getProductInfo = async () => {
        try {
          await productApi.getProduct(String(productId)).then((data) => {
            const productsData = data;
            console.log(productsData)
            setProduct(productsData);
        
          });
        } catch(error) {
          console.log(error);
        }
      };
      getProductInfo();
    }, [productId]);
    return (
        <Box>
            <Top product = {product}></Top>
            <Body product = {product}></Body>
            <Bottom product = {product}></Bottom>
            <DetailInfo product = {product}></DetailInfo>
        </Box>
    )
}

export default DetailProduct