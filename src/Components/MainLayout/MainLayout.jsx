import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";

function MainLayout() {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default MainLayout;
