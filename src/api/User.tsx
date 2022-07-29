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

const userApi = {
  getUser,
  setWallet,
};

export default userApi;
