import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import DashboardNavbar from "../pages/Dashboard/Navbar/DashboardNavbar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-primary/20 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <Sidebar />
      </div>

      {/* Overlay for small screen when sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col ">
        {/* Navbar with toggle button */}
        <DashboardNavbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-secondary/50 dark:bg-gray-800 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
