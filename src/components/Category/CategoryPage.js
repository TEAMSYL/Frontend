import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../../api/Product.tsx";
import {
  Container,
  ProductsSection,
  MainSection,
  InfoBar,
  SortButton,
  NoResultCase,
  Palette,
  ProductCell,
  Pagination,
} from "./StyledComponents";
const PRODUCTS_PER_PAGE = 30;

const SearchPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState();
  const [totalPage, setTotalPage] = React.useState();
  const [sortBtnState, setSortBtnState] = React.useState([true, false, false]);
  const [categoryName, setCateogry] = useState(state.name);

  // 최신순 버튼 클릭 핸들러
  const handleTimeSort = () => {
    const newSortBtnState = [true, false, false];
    setSortBtnState(newSortBtnState);
  };

  // 저가순 버튼 클릭 핸들러
  const handlePriceAsc = () => {
    const newSortBtnState = [false, false, true];
    setSortBtnState(newSortBtnState);
  };

  // 고가순 버튼 클릭 핸들러
  const handlePriceDsc = () => {
    const newSortBtnState = [false, true, false];
    setSortBtnState(newSortBtnState);
  };

  React.useEffect(() => {
    const fetchproducts = async () => {
      const products = await productApi.getCategoryProducts(state.categoryId);
      return products;
    };
    setCateogry(state.name);
    fetchproducts().then((data) => {
      setProducts(data);
      setTotalPage(Math.ceil(data.length / PRODUCTS_PER_PAGE));
      setPage(1);
    });
  }, [state]);

  return (
    <Container>
      <MainSection>
        <InfoBar>
          <Box display="flex" alignItems="center">
            <Typography
              fontSize="20px"
              color={Palette.text_red}
              display="inline-block"
            >
              {categoryName}
            </Typography>
            <Typography
              fontSize="20px"
              color={Palette.text_black}
              display="inline-block"
            >
              &nbsp; 카테고리의 검색결과
            </Typography>
            <Typography
              fontSize="20px"
              color={Palette.text_grey}
              display="inline-block"
            >
              &nbsp;{products.length}개
            </Typography>
          </Box>
          <Box>
            <SortButton isSelect={sortBtnState[0]} onClick={handleTimeSort}>
              최신순
            </SortButton>
            <SortButton isSelect={sortBtnState[1]} onClick={handlePriceDsc}>
              고가순
            </SortButton>
            <SortButton isSelect={sortBtnState[2]} onClick={handlePriceAsc}>
              저가순
            </SortButton>
          </Box>
        </InfoBar>
        <ProductsSection>
          {products.length === 0 && (
            <NoResultCase>
              <Stack
                direction="row"
                spacing={2}
                width="50%"
                display="flex"
                alignItems="center"
              >
                <Typography fontSize={24} color={Palette.text_red}>
                  {categoryName}
                </Typography>
                <Typography
                  fontSize={19}
                  fontWeight={500}
                  color={Palette.text_black}
                >
                  카테고리에 대한 결과가 존재하지 않습니다.
                </Typography>
              </Stack>
            </NoResultCase>
          )}
          {products.length != 0 && (
            <>
              <Grid container spacing={2}>
                {products
                  .slice(
                    (page - 1) * PRODUCTS_PER_PAGE,
                    page * PRODUCTS_PER_PAGE
                  )
                  .map((product) => (
                    <Grid item xs={2.4}>
                      <ProductCell product={product} />
                    </Grid>
                  ))}
              </Grid>
              <Pagination page={page} totalPage={totalPage} setPage={setPage} />
            </>
          )}
        </ProductsSection>
      </MainSection>
    </Container>
  );
};

export default SearchPage;
