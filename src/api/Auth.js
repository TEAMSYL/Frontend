import axios from "axios";

async function KakaoSignIn() {
  try {
    const response = await axios.post("http://localhost:8001/auth/kakao", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function SignUp(data) {
  try {
    const response = await axios.post(
      "http://localhost:8001/auth/join",
      {
        email: data.email,
        password: data.password,
        nick: data.nick,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function SignIn(data) {
  try {
    const response = await axios.post(
      "http://localhost:8001/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function SignOut() {
  try {
    await axios.get(`http://localhost:8001/auth/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

const AuthApi = { KakaoSignIn, SignUp, SignIn, SignOut };
export default AuthApi;
