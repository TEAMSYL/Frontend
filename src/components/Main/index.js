import { Divider, Grid, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useMemo } from "react";
import AdCarousel from "./AdCarousel";
import {
  Container,
  MainSection,
  ProductsSection,
  ProductCell,
  SectionTitle,
} from "./StyledComponents";
import { useFetchProducts } from "../../query/useFetchProduct";
import { useIntersect } from "../../hooks/useInterSection";
import styled from "styled-components";

const Main = () => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchProducts({
    size: 5,
  });

  const products = useMemo(() => (data ? data.pages : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <Container>
        <AdCarousel
          sx={{
            width: 1024,
            height: 300,
          }}
        ></AdCarousel>
        <Divider />
        <MainSection>
          <SectionTitle>오늘의 상품 추천</SectionTitle>
          <ProductsSection>
            <Grid container spacing={2}>
              {products.map((page) =>
                page.data.products.map((product) => (
                  <Grid item xs={2.4}>
                    <ProductCell product={product} />
                  </Grid>
                ))
              )}
            </Grid>
          </ProductsSection>
        </MainSection>
        {isFetching && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="inherit" />
          </Box>
        )}
        <Target ref={ref} />
      </Container>
    </>
  );
};
const Target = styled.div`
  height: 1px;
`;
export default Main;
