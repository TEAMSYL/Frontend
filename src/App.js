import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import LoginModal from "./components/LoginModal";
import { createTheme, ThemeProvider } from "@mui/material";
import Menu from "./components/Menu";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Products, ManageTab, RegistTab } from "./components/Product/Products";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";
import ProductModify from "./components/ProductModify";
import TxManagePage from "./components/TxMangePage";
import Purchase from "./components/TxMangePage/Purchase";
import Sell from "./components/TxMangePage/Sell";
import Mystore from "./components/Mystore/MyStore";
import DetailProduct from "./components/Product/ProductDetail/DetailProduct";
import userApi from "../src/api/User.tsx";
import CategoryPage from "./components/Category/CategoryPage";
import { QueryClientProvider, QueryClient } from "react-query";
import NFT from "./components/NFT/CreateNFT";
import MyNFT from "./components/NFT/MyNFT";
import SellNFT from "./components/NFT/SellNFTs";
import Chat from "./components/Chat/Chat";
const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans CJK KR",
  },
});

function App() {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const handleOpenLoginModalOpen = () => setOpenLoginModal(true);
  const handleOpenLoginModalClose = () => setOpenLoginModal(false);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.isLogin);
  const [account, setAccount] = useState("");
  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        alert("로그인 중...");
        alert("현재 계정 : " + accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      getAccount();
      console.log(account);
    }
  }, [isLogin]);

  useEffect(() => {
    async function fetchUser() {
      const user = await userApi.getUser();
      if (user) {
        dispatch({ type: "LOGIN" });
      }
      // ...
    }
    fetchUser();
  }, [dispatch]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Menu openModal={handleOpenLoginModalOpen} getAccount={getAccount} />
        <div style={{ paddingTop: "190px" }}>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route
              exact
              path="/products"
              element={
                <PrivateRoute isLogin={isLogin}>
                  <Products />
                </PrivateRoute>
              }
            >
              <Route path="regist" element={<RegistTab />} />
              <Route path="manage" element={<ManageTab />} />
            </Route>
            <Route
              exact
              path="/signup"
              element={
                <PublicRoute isLogin={isLogin}>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              exact
              path="/signin"
              element={
                <PublicRoute isLogin={isLogin}>
                  <Signin />
                </PublicRoute>
              }
            />
            <Route exact path="/search" element={<SearchPage />}></Route>
            <Route path="/category" element={<CategoryPage />}></Route>
            <Route path="/modify" element={<ProductModify />}></Route>
            <Route path="/transaction/manage" element={<TxManagePage />}>
              <Route path="sell" element={<Sell />} />
              <Route path="purchase" element={<Purchase />} />
            </Route>
            <Route
              exact
              path="/mystore/:userId"
              element={
                <PrivateRoute isLogin={isLogin}>
                  <Mystore />
                </PrivateRoute>
              }
            />
            <Route exact path="/chat" element={<Chat />} />
            <Route
              exact
              path="/nft"
              element={<NFT account={account} getAccount={getAccount} />}
            ></Route>
            <Route
              exact
              path="/mynft"
              element={<MyNFT account={account} getAccount={getAccount} />}
            ></Route>
            <Route
              exact
              path="/sellnft"
              element={<SellNFT account={account} getAccount={getAccount} />}
            ></Route>
            <Route
              exact
              path="/detail/:productId"
              element={<DetailProduct />}
            />
          </Routes>
        </div>
        <Footer></Footer>
        <LoginModal
          open={openLoginModal}
          closeModal={handleOpenLoginModalClose}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
