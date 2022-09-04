import { Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { grey } from "@mui/material/colors";
import { CATEGORY } from "../../Category/CategoryInfo";
import {
  Divider,
  Typography,
} from "../../../../node_modules/@mui/material/index";
import ImageCard from "../../Card";
import productApi from "../../../api/Product.tsx";

const Bottom = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState();
  const getNextPage = () => {
    if (!isLastPage) setPage(page + 1);
  };

  const getPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    const fetchproducts = async () => {
      const { products, isLastPage } = await productApi.getRelatedProducts({
        categoryId: product.category,
        productId: product.id,
        page: page,
        size: 5,
      });
      return { products, isLastPage };
    };
    fetchproducts().then((data) => {
      setIsLastPage(data.isLastPage);
      setRelatedProducts(data.products);
    });
  }, [product, page, isLastPage]);

  return (
    <Stack sx={{ maxWidth: "1024px", margin: "0 auto 10px" }} spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        style={{ width: "1024px", margin: "10px auto 0", lineHeight: 1.4 }}
      >
        {product.category ? CATEGORY[Number(product.category) - 1].icon : ""}
        {product.category ? (
          <Typography sx={{ fontSize: 15 }}>
            {CATEGORY[Number(product.category) - 1].name} 카테고리 연관상품
          </Typography>
        ) : (
          ""
        )}
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        minHeight="150px"
      >
        <Button onClick={getPrevPage}>
          <ArrowBackIosNewIcon sx={{ color: grey[500] }} />
        </Button>
        <Stack
          width="900px"
          justifyContent="left"
          direction="row"
          spacing={4.5}
        >
          {relatedProducts
            ? relatedProducts.map((product) => (
                <ImageCard key={product.id} product={product} />
              ))
            : "연관상품 없음"}
        </Stack>
        <Button onClick={getNextPage}>
          <ArrowForwardIosIcon sx={{ color: grey[500] }} />
        </Button>
      </Stack>
      <Divider />
    </Stack>
  );
};
export default Bottom;
