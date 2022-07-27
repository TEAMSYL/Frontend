import axios from "axios";
import { ISetProduct } from "./dto";

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
    const response = await axios.get(`http://localhost:8001/product/detail/${id}`);
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
    
    if (response.data === '상품 등록 완료' && response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function setProductImages(data: FormData) {
  try {
    const response = await axios.post(
      "http://localhost:8001/product/images",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
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
