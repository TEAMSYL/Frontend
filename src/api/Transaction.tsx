import axios from "axios";
import { ITransactionRequest } from "./dto";

async function request(data: ITransactionRequest) {
  try {
    await axios.post(
      `http://localhost:8001/transaction/request`,
      {
        productId: data.productId,
        price: data.price,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
async function permit(productId: number) {
  try {
    await axios.post(
      `http://localhost:8001/transaction/permit`,
      {
        productId: productId,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getRecievedRequest() {
    try {
      const response = await axios.get(
        'http://localhost:8001/transaction/request/recieved',
        { withCredentials: true }
      );
      console.log('response:',response);
    } catch (error) {
      console.log(error);
    }
}

const transactionApi = { request, permit, getRecievedRequest };
export default transactionApi;
