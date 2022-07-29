import axios from "axios";
import { ISetProduct } from "./dto";
import { TrySharp } from "@mui/icons-material";
import { createTrue } from 'typescript';

async function getProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product`);
    console.log("상품 목록:", response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product/seller`, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  } 
}

async function getProductsByUserId(userId: string) {
  try {
    const response = await axios.get(`http://localhost:8001/product/user/${userId}`,
    {withCredentials: true});
    console.log('getProductsByUserId response: ', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

async function getProduct(id: string | undefined) {
  try {
    const response = await axios.get(`http://localhost:8001/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductDetail(id: string | undefined) {
  console.log('id:', id);
  try {
    const response = await axios.get(`http://localhost:8001/product/detail?id=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function setProduct(data: FormData) {
  try {
    const response = await axios.post(
      "http://localhost:8001/product",
      data,
      { 
        headers: {
          "Content-Type": "multipart/form-data; charset=UTF-8",
        },
        withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function setProductImages(data: FormData, productId) {
  try {
    const response = await axios.post(
      `http://localhost:8001/product/images/${productId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data; charset=UTF-8",
        },
        withCredentials: true,
      }
    );
    console.log("이미지 api 응답", response);
    if (response.status == 201) {
      return true;
    } else {
      return false
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteProduct(id: string | undefined) {
  try {
    const response = await axios.delete(`http://localhost:8001/product/${id}`, {
      withCredentials: true,
    });
    console.log('상품 삭제 response: ', response);
    if (response.data == "완료" && response.status == 200) { // 삭제에 성공한 경우
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function searchProducts(keyWord: string) {
  keyWord =  encodeURIComponent(keyWord);
  try {
    const response = await axios.get(`http://localhost:8001/product/search?searchword=${keyWord}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const productApi = {
  getProducts,
  getProduct,
  setProduct,
  deleteProduct,
  setProductImages,
  getUserProducts,
  getProductDetail,
  searchProducts,
  getProductsByUserId
};

export default productApi;
