import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { CiLight, CiLogout } from "react-icons/ci";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdOutlineDarkMode } from "react-icons/md";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, userSignOut, loading, darkMode, setDarkMode } =
    useContext(AuthContext);
  const [homeNav, setHomeNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHomeNav(location.pathname === "/");
  }, [location.pathname]);

  const signOutUser = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          title: "log out Successfully!",
          icon: "success",
          draggable: true,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch(() => {
        toast.error("Sign Out unsuccessful!");
      });
  };
  {
    if (loading) {
      return (
        <div className="flex justify-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      );
    }
  }

  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `hover:bg-black py-4 px-6 hover:text-white text-gray-400 ${
            isActive
              ? "bg-black text-white dark:bg-gray-500 dark:text-white/40"
              : ""
          }`
        }
      >
        HOME
      </NavLink>
      <NavLink
        to={"/allRecipes"}
        className={({ isActive }) =>
          `hover:bg-black py-4 px-6 hover:text-white text-gray-400 ${
            isActive
              ? "bg-black text-white dark:bg-gray-500 dark:text-white/40"
              : ""
          }`
        }
      >
        ALL RECIPES
      </NavLink>

      <NavLink
        to={"/addRecipe"}
        className={({ isActive }) =>
          `hover:bg-black py-4 px-6 hover:text-white text-gray-400 ${
            isActive
              ? "bg-black text-white dark:bg-gray-500 dark:text-white/40"
              : ""
          }`
        }
      >
        ADD RECIPE
      </NavLink>
      <NavLink
        to={"/my-recipes"}
        className={({ isActive }) =>
          `hover:bg-black py-4 px-6 hover:text-white text-gray-300 ${
            isActive
              ? "bg-black text-white dark:bg-gray-500 dark:text-white/40"
              : ""
          }`
        }
      >
        MY RECIPES
      </NavLink>
    </>
  );

  return (
    <nav
      className={` transition-all duration-300  shadow-md px-4  flex items-center justify-between w-full  top-0 z-50  ${
        homeNav ? "bg-white/0 fixed" : "bg-white sticky dark:bg-gray-800"
      }  `}
    >
      <div className="text-2xl font-bold text-black secondary-font dark:text-gray-200">
        RecipeBook
      </div>

      <ul className="hidden md:flex  items-center text-gray-600 ">{links}</ul>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="ring-primary ring-offset-base-100 w-10 h-10 overflow-hidden rounded-full ring-2 ring-offset-2 aspect-square cursor-pointer"
            >
              <img
                src={user?.photoURL}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <div className="px-4 py-2 text-gray-800 border-b">
                  {user.displayName}
                </div>
                <button
                  onClick={() => signOutUser()}
                  className="w-full text-left px-4 inline-flex items-center gap-1.5 py-2 hover:bg-gray-100 text-red-600"
                >
                  <span>
                    <CiLogout />
                  </span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex gap-2">
            <Link
              to={"login"}
              className="bg-green-500 btn text-white hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              to={"register"}
              className="bg-blue-500 text-white btn hover:bg-blue-600"
            >
              Register
            </Link>
          </div>
        )}

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:text-white dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? <CiLight /> : <MdOutlineDarkMode />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 top-9 flex flex-col bg-white border rounded shadow-lg z-50">
          {links}
        </div>
      )}
    </nav>
  );
};

export default Header;
