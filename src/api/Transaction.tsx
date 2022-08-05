import axios from "axios";
import { ITransactionRequest } from "./dto";

async function request(data: ITransactionRequest) {
  try {
    const response = await axios.post(
      `http://localhost:8001/transaction/request`,
      {
        productId: data.productId,
        price: data.price,
      },
      {
        withCredentials: true,
      }
    );
      return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
async function permit(productId: number, buyerId: number) {
  try {
    const response = await axios.post(
      `http://localhost:8001/transaction/permission`,
      {
        productId: productId,
        buyerId: buyerId
      },
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

async function refuse(requestId: number) {
  try {
    const response = await axios.delete(
      `http://localhost:8001/transaction/request/${String(requestId)}`,
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

async function getRecievedRequest() {
    try {
      const response = await axios.get(
        'http://localhost:8001/transaction/request/recieved',
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
}

async function getRequestsToProduct(productId: string) {
  try {
    const response = await axios.get(`http://localhost:8001/transaction/request/recieved/product?productId=${productId}`,
      { withCredentials: true}
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getPermittedRequests() {
  try {
    const response = await axios.get(
      `http://localhost:8001/transaction/permission`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

async function getPermittedPurchases() {
  try {
    const response = await axios.get(
      `http://localhost:8001/transaction/purchase/permission`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function makePayment(txId: String) {
  try {
    const response = await axios.post(
      `http://localhost:8001/transaction/makepayment`,
      {
        txId: txId
      },
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

async function cancel(txId: string) {
  try {
    const response = await axios.delete(`http://localhost:8001/transaction/cancel/${txId}`,
      { withCredentials: true}
    );
    console.log("cancel function response: ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const transactionApi = { 
  request, 
  permit, 
  getRecievedRequest, 
  getRequestsToProduct,
  refuse,
  cancel,
  getPermittedRequests,
  getPermittedPurchases,
  makePayment
};
export default transactionApi;  
