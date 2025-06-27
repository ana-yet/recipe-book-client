import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
