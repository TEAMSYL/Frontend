import React from "react";
import Main from "./components/Main";
import LoginModal from './components/LoginModal';
import { createTheme, ThemeProvider } from '@mui/material';
import Menu from './components/Menu';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import {Products, RegistProduct, ManageProducts} from './components/Products';
import Test from './components/Test';

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans CJK KR",
  },
});

function App() {
  const [ openLoginModal, setOpenLoginModal] = React.useState(false);
  const handleOpenLoginModalOpen = () => setOpenLoginModal(true);
  const handleOpenLoginModalClose = () => setOpenLoginModal(false); 
  return (
    <ThemeProvider theme={theme}>
      <Menu openModal={handleOpenLoginModalOpen}/>
      <div style={{paddingTop: "190px"}}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<Products/>}>
            <Route path='regist' element={<RegistProduct />} />
            <Route path="manage" element={<ManageProducts />} />
          </Route>
        </Routes>
      </div>
      <LoginModal open={openLoginModal} closeModal={handleOpenLoginModalClose}/>
    </ThemeProvider>
  );
}

export default App;
