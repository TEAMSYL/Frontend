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
import { orange, grey, green, red, yellow, brown } from "@mui/material/colors";

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
            <ComputerIcon sx={{ color: grey[400] }} />
            <Typography sx={{ fontSize: 8 }}>디지털기기</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(2, e)}>
            <ChairIcon sx={{ color: brown[500] }} />
            <Typography sx={{ fontSize: 8 }}>가구</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(3, e)}>
            <BookIcon sx={{ color: orange[400] }} />
            <Typography sx={{ fontSize: 8 }}>책</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(4, e)}>
            <ConfirmationNumberIcon sx={{ color: red[600] }} />
            <Typography sx={{ fontSize: 8 }}>티켓/음반</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(5, e)}>
            <CheckroomIcon sx={{ color: grey[900] }} />
            <Typography sx={{ fontSize: 8 }}>의류</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(6, e)}>
            <SportsTennisIcon sx={{ color: green[400] }} />
            <Typography sx={{ fontSize: 8 }}>스포츠용품</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(7, e)}>
            <PetsIcon sx={{ color: brown[900] }} />
            <Typography sx={{ fontSize: 8 }}>반려동물용품</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(8, e)}>
            <AddShoppingCartIcon color="primary" />
            <Typography sx={{ fontSize: 8 }}>생활용품</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(9, e)}>
            <ParkIcon sx={{ color: green[900] }} />
            <Typography sx={{ fontSize: 8 }}>식물</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(10, e)}>
            <AutoFixHighIcon sx={{ color: yellow[200] }} />
            <Typography sx={{ fontSize: 8 }}>뷰티/미용</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item onClick={(e) => handleOnclick(11, e)}>
            <SportsEsportsIcon sx={{ color: red[400] }} />
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
