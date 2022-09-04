import axios from 'axios';

async function getRooms(id: string | undefined) {
  try {
    const response = await axios.get('http://localhost:8001/chat?id=' + id);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function findRoom(productId: number | undefined, id: string | undefined) {
  try {
    console.log(productId, id);
    const response = await axios.get(
      'http://localhost:8001/findchat?productId=' + productId + '&id=' + id,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function createRoom(
  sellerId: String | undefined,
  buyerId: string | undefined,
  productId: number | undefined,
) {
  try {
    await axios.post(
      'http://localhost:8001/createchat?sellerId=' +
        sellerId +
        '&buyerId=' +
        buyerId +
        '&productId=' +
        productId,
    );
  } catch (error) {
    console.log(error);
  }
}

async function getChats(room: string | undefined, id: string | undefined) {
  try {
    const response = await axios.get(
      'http://localhost:8001/chatview?room=' + room + '&name=' + id,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getLastChat(roomId: Number | undefined) {
  try {
    const response = await axios.get(
      `http://localhost:8001/getlastchat?roomId=${roomId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductId(roomId: Number | undefined) {
  try {
    const response = await axios.get(
      `http://localhost:8001/getproductid?roomId=${roomId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getLastCnt(userId: Number | undefined) {
  try {
    const response = await axios.get(
      `http://localhost:8001/getlastcnt?userId=${userId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getOpenChatCount(productId: Number | undefined) {
  try {
    console.log('pid: ', productId);
    const response = await axios.get(`http://localhost:8001/chat/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const chatApi = {
  getLastCnt,
  getRooms,
  getChats,
  findRoom,
  createRoom,
  getLastChat,
  getProductId,
  getOpenChatCount,
};

export default chatApi;
