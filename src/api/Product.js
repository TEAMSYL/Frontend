import axios from "axios";
//import { ISetProduct } from "./dto";

async function getProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product`);
    return response.data;
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

};

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

/* @param
 * data: type-ISedProduct
 */
async function setProducts(data) {
  try {
    await axios.post(
      "http://localhost:8001/product",
      {
        productName: data.productName,
        content: data.content,
        category: data.category,
        price: data.price,
        imgUrls: data.imgUrls
      },
      { withCredentials: true }
    );
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
  setProducts,
  deleteProduct,
};

export default productApi;
