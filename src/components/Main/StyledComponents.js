import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export const SectionTitle = styled.h2`
  font-weight: 400;
  margin-top: 50px;
`;

export const Palette = {
  text_red: "#FF5058",
  text_black: "#212121",
  text_grey: "#888888",
  border_grey: "#EEEEEE",
  border_grey_ligth: "#CCCCCC",
};

export const Container = ({ children }) => {
  return (
    <Stack
      sx={{
        width: "100vw",
        minWidth: "1024px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        paddingTop: "50px",
      }}
    >
      {children}
    </Stack>
  );
};

export const MainSection = ({ children }) => {
  return (
    <Stack
      sx={{
        width: "1024px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </Stack>
  );
};

export const ProductsSection = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </Box>
  );
};

export const ProductCell = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${product.id}`);
  };
  return (
    <Button
      sx={{
        border: `1px solid ${Palette.border_grey}`,
        padding: "0",
        width: "100%",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      onClick={handleClick}
    >
      <Stack width="100%">
        <Box
          sx={{
            position: "relative",
            display: "block",
            overflow: "hidden",
            width: "100%",
            paddingBottom: "100%",
          }}
        >
          <img
            alt="상품 썸네일"
            src={product.thumbnail}
            style={{
              position: "absolute",
              display: "block",
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "contain",
              borderBottom: "1px solid #E6E5EF",
              backgroundColor: "#FAFAFD",
            }}
          />
        </Box>
        <Stack padding="15px 15px">
          <Typography
            textAlign="start"
            fontSize="16px"
            paddingBottom="15px"
            color={Palette.text_black}
          >
            {product.productName.slice(0, 12)}
          </Typography>
          <Typography
            textAlign="start"
            fontSize="18px"
            fontWeight="600"
            color={Palette.text_black}
          >
            {product.price} ETH
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
};
