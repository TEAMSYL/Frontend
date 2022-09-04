import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, CardMedia, CardActionArea } from "@mui/material";

const ImageCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${product.id}`);
  };

  return (
    <Card sx={{ minWidth: 150, maxWidth: 150 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="100"
          image={product.thumbnail}
          alt="thumbnail"
        />
        <Typography textAlign="center" variant="h6" component="div">
          {product.productName}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
