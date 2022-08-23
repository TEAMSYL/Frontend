import React, { useEffect } from "react";
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
        <Menu openModal={handleOpenLoginModalOpen} />
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
            <Route
              exact
              path="/detail/:productId"
              element={<DetailProduct />}
            />
          </Routes>
        </div>
        {/* <Footer></Footer> */}
        <LoginModal
          open={openLoginModal}
          closeModal={handleOpenLoginModalClose}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
