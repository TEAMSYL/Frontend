import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ProductsSection, MainSection, InfoBar, SortButton, NoResultCase, Palette, ProductCell, Pagination } from '../../SearchPage/StyledComponents';
import Rating from '@mui/material/Rating';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import productApi from '../../../api/Product.tsx'

const Review = ({userId}) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = React.useState([]);
  const [ page, setPage ] = React.useState();
  const [ totalPage, setTotalPage ] = React.useState();
  const PRODUCTS_PER_PAGE = 5;

  const handleDetailClick = (productId) => {
    navigate("/detail/"+productId);
  };

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        await productApi.getReviews(userId).then((data) => {
          console.log(data);
          setReviews(data);
          setTotalPage(Math.ceil(data.length/PRODUCTS_PER_PAGE));
          setPage(1);
        });
      } catch(error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [userId]);

  return (
    <Box sx={{width:'1024px', margin: '0 auto 100px'}}>
        <InfoBar> 
          <Box display='flex' alignItems='center'>
            <Typography  fontSize='20px' color={Palette.text_grey} display='inline-block'>&nbsp;&nbsp;총&nbsp;</Typography>
            <Typography  fontSize='20px' color={Palette.text_black} display='inline-block'>{reviews.length}</Typography>
            <Typography  fontSize='20px' color={Palette.text_grey} display='inline-block'>&nbsp;개</Typography>
          </Box>
        </InfoBar>
        <ProductsSection>
          {reviews.length === 0 && (
                  <Typography fontSize={19} fontWeight={500} color={Palette.text_black}>상점 후기가 없습니다.</Typography>
          )}
          {reviews.length != 0 && (
              <>
                  <Stack borderTop="1px solid #EEEEEE">
                      {reviews.slice( (page -1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
                      .map((review) => (
                          <Stack 
                            sx={{
                              width: "1024px",
                              padding: "15px 0px 15px",
                              borderBottom: "1px solid #EEEEEE",
                            }}
                            spacing={1}
                          >
                              <Typography fontSize="18px">{review.buyer.nick}</Typography>
                              <Rating
                                readOnly
                                value={review.rate}
                              />
                              <Typography
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: 'fit-content',
                                  border: "1px solid #EEEEEE",
                                  padding: '5px 10px',
                                  color: '#666666',
                                  cursor: "pointer"
                                }}
                                onClick={()=> handleDetailClick(review.productId)}
                              >{review.productName}<KeyboardArrowRightIcon/></Typography>
                              <Typography>{review.text}</Typography>
                          </Stack>
                      ))}
                  </Stack>
                  <Pagination page={page} totalPage={totalPage} setPage={setPage}/>
              </>
          )}
        </ProductsSection>
    </Box>
  );
};

export default Review;