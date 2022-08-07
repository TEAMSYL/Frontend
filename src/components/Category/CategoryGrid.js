import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { IconButton, Typography } from "@mui/material";
import { CATEGORY } from "./CategoryInfo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CategoryGrid(props) {
  const navigate = useNavigate();

  const handleOnclick = (id, name, e) => {
    e.preventDefault();
    props.handleClose();
    navigate("/category", { state: { categoryId: id, name: name } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {CATEGORY.map((category) => (
          <Grid item xs={4}>
            <Item>
              <IconButton
                onClick={(e) => handleOnclick(category.id, category.name, e)}
              >
                {category.icon}
              </IconButton>
              <Typography sx={{ fontSize: 8 }}>{category.name}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
