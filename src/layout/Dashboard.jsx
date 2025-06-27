import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-secondary/50 dark:bg-gray-800 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
