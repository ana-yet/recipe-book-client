import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="dark:bg-[#1A1F1D]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
