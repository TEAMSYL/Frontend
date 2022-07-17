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
    await axios.post(
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
  } catch (error) {
    console.log(error);
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
    console.log("이미지 api 응답", response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function deleteProduct(id: string | undefined) {
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
};

export default productApi;
