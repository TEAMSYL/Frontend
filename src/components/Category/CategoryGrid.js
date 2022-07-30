import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ComputerIcon from "@mui/icons-material/Computer";
import ChairIcon from "@mui/icons-material/Chair";
import BookIcon from "@mui/icons-material/Book";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import PetsIcon from "@mui/icons-material/Pets";
import MoreIcon from "@mui/icons-material/More";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ParkIcon from "@mui/icons-material/Park";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Typography } from "@mui/material";
import productApi from "../../api/Product.tsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CategoryGrid(props) {
  const navigate = useNavigate();

  const handleOnclick = (id, e) => {
    e.preventDefault();
    props.handleClose();
    productApi.getCategoryProducts(id);
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(1, e)}>
            <ComputerIcon />
            <Typography sx={{ fontSize: 8 }}>디지털기기</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(2, e)}>
            <ChairIcon />
            <Typography sx={{ fontSize: 8 }}>가구</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(3, e)}>
            <BookIcon />
            <Typography sx={{ fontSize: 8 }}>책</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(4, e)}>
            <ConfirmationNumberIcon />
            <Typography sx={{ fontSize: 8 }}>티켓/음반</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(5, e)}>
            <CheckroomIcon />
            <Typography sx={{ fontSize: 8 }}>의류</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(6, e)}>
            <SportsTennisIcon />
            <Typography sx={{ fontSize: 8 }}>스포츠용품</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(7, e)}>
            <PetsIcon />
            <Typography sx={{ fontSize: 8 }}>반려동물용품</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(8, e)}>
            <AddShoppingCartIcon />
            <Typography sx={{ fontSize: 8 }}>생활용품</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(9, e)}>
            <ParkIcon />
            <Typography sx={{ fontSize: 8 }}>식물</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(10, e)}>
            <AutoFixHighIcon />
            <Typography sx={{ fontSize: 8 }}>뷰티/미용</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(11, e)}>
            <SportsEsportsIcon />
            <Typography sx={{ fontSize: 8 }}>게임</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(12, e)}>
            <MoreIcon />
            <Typography sx={{ fontSize: 8 }}>기타</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
