import React, { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import productApi from '../../../api/Product.tsx'

const MyProducts = () => {
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await productApi.getUserProducts().then((response) => {
          const productsData = response.data;;
          setMyProducts(productsData);
        });
      } catch(error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  const handleClick = (id) => {
    console.log(id, ' Clicked!!')
    navigate(`/detail/${id}`);
  };
  return (
    <Box sx={{width:'1024px', margin: '0 auto 100px'}}>
        <h3>내가 판매중인 항목</h3>
        {myProducts.map((myProduct, i) => (
          <div onClick={()=> handleClick(myProduct['id'])} key={i}>
            {myProduct['id']} {myProduct['productName']} {myProduct['category']}
          </div>
        ))}
    </Box>
  );
};

export default MyProducts;