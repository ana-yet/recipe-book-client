import React from "react";
import { NavLink } from "react-router";
import {
  FaHome,
  FaPlus,
  FaBook,
  FaHeart,
  FaCalendarAlt,
  FaShoppingBasket,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../../hook/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/dashboard/add-recipe", name: "Add Recipe", icon: <FaPlus /> },
    { path: "/dashboard/my-recipes", name: "My Recipes", icon: <FaBook /> },

    {
      path: "/dashboard/recipes",
      name: "All Recipe",
      icon: <FaCalendarAlt />,
    },

    {
      path: "/dashboard/profile",
      name: "Profile Settings",
      icon: <FaUserCog />,
    },
  ];

  return (
    <div className="inset-y-0 h-screen overflow-scroll bg-secondary dark:bg-gray-800 shadow-lg flex flex-col border-r border-primary/20 dark:border-gray-700">
      <div className="p-6 flex items-center space-x-3 border-b border-primary/20 dark:border-gray-700">
        <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-primary dark:text-secondary font-semibold">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-secondary">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-primary/80 dark:text-secondary/80">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-secondary"
                      : "text-gray-700 hover:bg-primary/10 dark:hover:bg-gray-700 dark:text-secondary"
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary/20 dark:border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-primary/10 dark:hover:bg-gray-700 dark:text-secondary transition-colors duration-200"
        >
          <span className="mr-3 text-lg">
            <FaSignOutAlt />
          </span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
