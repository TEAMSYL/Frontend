import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import DetailInfo from './DetailInfo';
import Bottom from './Bottom';
import Body from './Body';
import productApi from '../../../api/Product.tsx';
import userApi from '../../../api/User.tsx';
const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  // user 정보 전역변수가 아직 존재하지 않아 api로 임시로 요청하여 사용
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        await productApi.getProductDetail(String(productId)).then(data => {
          const productsData = data;
          console.log('상품정보:', productsData);
          setProduct(productsData);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getUserInfo = async () => {
      try {
        await userApi.getUser().then(data => {
          console.log('user:', data);
          setUser(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProductInfo();
    getUserInfo();
  }, [productId]);

  return (
    <Box>
      <Body product={product} user={user}></Body>
      <Bottom product={product}></Bottom>
      <DetailInfo product={product} user={user}></DetailInfo>
    </Box>
  );
};

export default DetailProduct;
