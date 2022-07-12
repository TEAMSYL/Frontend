import axios from "axios";
import { ISetProduct } from "./dto";

async function getProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product`);
    return response.data;
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

async function setProducts(data: ISetProduct) {
  try {
    await axios.post(
      "http://localhost:8001/product",
      {
        productName: data.productName,
        content: data.content,
        category: data.category,
        price: data.price,
      },
      { withCredentials: true }
    );
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
  setProducts,
  deleteProduct,
};

export default productApi;
