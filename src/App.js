import React from "react";
import Main from "./components/Main";
import LoginModal from './components/LoginModal';
import { createTheme, ThemeProvider } from '@mui/material';
import Menu from './components/Menu';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Products from './components/Product/Products';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import { useSelector } from 'react-redux';

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans CJK KR",
  },
});

function App() {
  const [ openLoginModal, setOpenLoginModal] = React.useState(false);
  const handleOpenLoginModalOpen = () => setOpenLoginModal(true);
  const handleOpenLoginModalClose = () => setOpenLoginModal(false);
  const { isLogin } = useSelector(state => state.isLogin);
  
  return (
    <ThemeProvider theme={theme}>
      <Menu openModal={handleOpenLoginModalOpen}/>
      <div style={{paddingTop: "190px"}}>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route 
            exact path="/products" 
            element={
              <PrivateRoute isLogin={isLogin}>
                <Products/>
              </PrivateRoute>} 
          />
          <Route 
            exact path="/signup" 
            element={
                <PublicRoute isLogin={isLogin}>
                  <Signup />
                </PublicRoute>
              }
          />
          <Route 
            exact path="/signin" 
            element={
                <PublicRoute isLogin={isLogin}>
                  <Signin/>
                </PublicRoute>
              }
          />
        </Routes>
      </div>
      <Footer></Footer>
      <LoginModal open={openLoginModal} closeModal={handleOpenLoginModalClose}/>
    </ThemeProvider>
  );
}

export default App;
