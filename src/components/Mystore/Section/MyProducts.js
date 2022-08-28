import React, { useState, useEffect } from "react";
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import productApi from '../../../api/Product.tsx'
import { ProductsSection, MainSection, InfoBar, SortButton, NoResultCase, Palette, ProductCell, Pagination } from '../../SearchPage/StyledComponents';

const MyProducts = ({ userId }) => {
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState([]);
  const [ page, setPage ] = React.useState();
  const [ totalPage, setTotalPage ] = React.useState();
  const PRODUCTS_PER_PAGE = 30;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await productApi.getProductsByUserId(String(userId)).then((data) => {
          setMyProducts(data);
          setTotalPage(Math.ceil(data.length/PRODUCTS_PER_PAGE));
          setPage(1);
        });
      } catch(error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [userId]);

  const handleClick = (id) => {
    console.log(id, ' Clicked!!')
    navigate(`/detail/${id}`);
  };
  
  return (
    <Box sx={{width:'1024px', margin: '0 auto 100px'}}>
        <InfoBar>
          <Box display='flex' alignItems='center'>
            <Typography  fontSize='20px' color={Palette.text_grey} display='inline-block'>&nbsp;&nbsp;총&nbsp;</Typography>
            <Typography  fontSize='20px' color={Palette.text_black} display='inline-block'>{myProducts.length}</Typography>
            <Typography  fontSize='20px' color={Palette.text_grey} display='inline-block'>&nbsp;개</Typography>
          </Box>
        </InfoBar>
        <ProductsSection>
          {myProducts.length === 0 && (
                  <Typography fontSize={19} fontWeight={500} color={Palette.text_black}>판매 중인 상품이 없습니다.</Typography>
          )}
          {myProducts.length != 0 && (
              <>
                  <Grid container spacing={2}>
                      {myProducts.slice( (page -1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
                      .map((product) => (
                          <Grid item xs={2.4}>
                              <ProductCell product={product}/>
                          </Grid>
                      ))}
                  </Grid>
                  <Pagination page={page} totalPage={totalPage} setPage={setPage}/>
              </>
          )}
        </ProductsSection>
    </Box>
  );
};

export default MyProducts;