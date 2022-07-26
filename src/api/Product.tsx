import axios from "axios";
import { ISetProduct } from "./dto";
import { TrySharp } from "@mui/icons-material";

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

async function getProduct(id: string | undefined) {
  try {
    const response = await axios.get(`http://localhost:8001/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function setProduct(data: ISetProduct) {
  try {
    const response = await axios.post(
      "http://localhost:8001/product",
      {
        productName: data.productName,
        content: data.content,
        category: data.category,
        price: data.price,
        imgUrls: data.imgUrls,
      },
      { withCredentials: true }
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
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id: string | undefined) {
  console.log('id:',id);
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

const productApi = {
  getProducts,
  getProduct,
  setProduct,
  deleteProduct,
  setProductImages,
  getUserProducts,
};

export default productApi;
