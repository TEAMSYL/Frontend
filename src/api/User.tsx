import axios from "axios";

async function setWallet(data: FormData) {
  try {
    await axios.post(
      "http://localhost:8001/user/account",
      {
        wallet_address: data.get("wallet_address"),
        privatekey: data.get("privatekey"),
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
}
async function getUser() {
  try {
    const response = await axios.get(`http://localhost:8001/user`, {
      withCredentials: true,
    });
    console.log('user:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserNick(id: Number | undefined) {
  try {
    const response = await axios.get(`http://localhost:8001/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function setUserNick(id: Number | undefined, data: FormData | undefined) {
  try{
    const response = await axios.patch(`http://localhost:8001/user/${id}`, data);
    return response.status;
  }catch (error) {
    console.log(error);
  }
}


const userApi = {
  getUser,
  setWallet,
  getUserNick,
  setUserNick
};

export default userApi;
