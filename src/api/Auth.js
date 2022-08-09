import axios from "axios";

async function SignUp(data) {
  try {
    const response = await axios.post(
      "http://localhost:8001/auth/join",
      {
        email: data.email,
        password: data.password,
        nick: data.nick,
        walletAddress: data.walletAddress,
        privatekey: data.privatekey,
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
    return error;
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

async function LoginCheck() {
  try {
    const response = await axios.get(`http://localhost:8001/auth/logincheck`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function EmailDuplicateCheck(email) {
  try {
    const response = await axios.post(
      "http://localhost:8001/auth/duplicateEmail",
      {
        email: email,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function NickDuplicateCheck(nick) {
  console.log(nick);
  try {
    const response = await axios.post(
      "http://localhost:8001/auth/duplicateNick",
      {
        nick: nick,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
const AuthApi = {
  SignUp,
  SignIn,
  SignOut,
  LoginCheck,
  EmailDuplicateCheck,
  NickDuplicateCheck,
};
export default AuthApi;
