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

async function setTrackingNumber(trackingNumber: string, productId: string, trackingCode: string) {
  try {
    const response = await axios.post(`http://localhost:8001/transaction/trackingnumber`,
      { 
        productId: productId,
        trackingNumber: trackingNumber,
        trackingCode: trackingCode
      },
      { withCredentials: true},
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

async function complete(productId: string) {
  try {
    const response = await axios.post(`http://localhost:8001/transaction/complete`,
      {
        productId: productId
      },
      { withCredentials: true}
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getTrackingInfo(productId: String) {
  try {
    const response = await axios.get(`http://localhost:8001/transaction/trackinginfo/${productId}`,
      {
        withCredentials: true
      }
    );
    return response;
  } catch (error) {
    console.log(error)
  }
}

async function returnProduct(trackingNumber: String, productId: String, companyCode: String) {
  try {
    const response = await axios.put(`http://localhost:8001/transaction/return`,
      {
        productId: productId,
        trackingNumber: trackingNumber,
        trackingCode: companyCode
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const transactionApi = { 
  request, 
  permit, 
  getRecievedRequest, 
  getRequestsToProduct,
  refuse,
  cancel,
  getPermittedRequests,
  getPermittedPurchases,
  makePayment,
  setTrackingNumber,
  complete,
  returnProduct,
  getTrackingInfo
};
export default transactionApi;  
