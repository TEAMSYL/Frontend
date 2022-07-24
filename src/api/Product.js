import { TrySharp } from "@mui/icons-material";
import axios from "axios";
//import { ISetProduct } from "./dto";

async function getProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product`);
    console.log("상품 목록:", response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

/* @param
 * num: type-num, startProductId: type-num
 */
async function getProductsByNum(num, startProductId) {
  // startProductId부터 최신순으로 num개 만큼 상품정보를 읽어온다.
  // 읽어와야하는 상품 정보
  // => 대표 이미지, 제목, 가격
}

/* @param
 * id: type-string|undefined
 */
async function getProduct(id) {
  try {
    const response = await axios.get(`http://localhost:8001/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getSellerProducts() {
  try {
    const response = await axios.get(
      `http://localhost:8001/product/seller?page=2&limit=4`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/* @param
 * data: type-ISedProduct
 */
async function setProducts(data) {
  try {
    await axios.post(
      "http://localhost:8001/auth/isLoggedIn",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
}
async function setProduct(data) {
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
async function setProductImages(data, productId) {
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

/* @param
 * id: type-string|undefined
 */
async function deleteProduct(id) {
  try {
    await axios.delete(`http://localhost:8001/product/${id}`, {
      withCredentials: true,
    });
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
  getSellerProducts,
};

export default productApi;
