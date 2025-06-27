import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  FaUserCircle,
  FaHome,
  FaBookOpen,
  FaPlusCircle,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { FiMail, FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { CiLight, CiLogout } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { GiCook } from "react-icons/gi";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, userSignOut, loading, darkMode, setDarkMode } =
    useContext(AuthContext);
  const [isTransparent, setIsTransparent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  // outside clicking close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsTransparent(window.scrollY < window.innerHeight * 0.8);
      } else {
        setIsTransparent(false);
      }
    };

    handleScroll();

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleLogoutConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from RecipeBook",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4a7c59",
      cancelButtonColor: "#e85d75",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      background: darkMode ? "#1a1f1d" : "#f8f4e3",
      color: darkMode ? "#ffffff" : "#333333",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
      }
    });
  };

  const signOutUser = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          background: darkMode ? "#1a1f1d" : "#f8f4e3",
          color: darkMode ? "#ffffff" : "#333333",
        });
        navigate("/login");
      })
      .catch(() => {
        toast.error("Sign out unsuccessful!");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  const NavLinkWithIcon = ({ to, icon: Icon, text }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 py-4 px-6 transition-colors ${
          isActive
            ? "bg-primary text-white dark:bg-primary/90 dark:text-white"
            : `${
                isTransparent
                  ? "text-white hover:text-gray-200"
                  : "text-secondary dark:text-white"
              } hover:bg-primary hover:text-white dark:hover:bg-primary/90 dark:hover:text-white`
        }`
      }
    >
      <Icon className="text-lg text-current" />
      <span>{text}</span>
    </NavLink>
  );

  const links = (
    <>
      <NavLinkWithIcon to="/" icon={FaHome} text="HOME" />
      <NavLinkWithIcon to="/allRecipes" icon={FaBookOpen} text="ALL RECIPES" />
      <NavLinkWithIcon to="contact-us" icon={FiMail} text="Contact Us" />
      <NavLinkWithIcon to="about-us" icon={FaUsers} text="About Us" />
      {user && (
        <>
          <NavLinkWithIcon
            to="/addRecipe"
            icon={FaPlusCircle}
            text="ADD RECIPE"
          />
          <NavLinkWithIcon to="/my-recipes" icon={FaBook} text="MY RECIPES" />
        </>
      )}
    </>
  );

  return (
    <nav
      className={`transition-all duration-300 shadow-md px-4 md:px-8 lg:px-20 flex items-center justify-between w-full top-0 z-50 ${
        isTransparent
          ? "fixed bg-transparent text-white dark:text-white"
          : `sticky ${
              darkMode ? "bg-gray-900 text-white" : "bg-primary text-white"
            }`
      }`}
    >
      <div className="flex items-center gap-1 text-2xl font-bold font-primary text-white">
        <GiCook className="text-secondary" size={28} />
        <span>
          Recipe<span className="text-secondary">Book</span>
        </span>
      </div>

      <ul className="hidden md:flex items-center">{links}</ul>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-10 h-10 overflow-hidden rounded-full ring-2 ring-offset-2 aspect-square cursor-pointer transition-all duration-200 ${
                darkMode
                  ? "ring-white ring-offset-gray-900"
                  : "ring-white ring-offset-primary"
              } ${
                userMenuOpen
                  ? "ring-4 transform scale-110"
                  : "hover:ring-3 hover:transform hover:scale-105"
              }`}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-200 hover:text-white" />
              )}
            </div>

            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200 ease-in-out ${
                  darkMode
                    ? "bg-gray-800 border border-gray-600"
                    : "bg-primary border border-white/20"
                }`}
                style={{
                  opacity: userMenuOpen ? 1 : 0,
                  transform: userMenuOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                }}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    darkMode ? "border-gray-600" : "border-white/20"
                  }`}
                >
                  <p className="text-white font-medium truncate">
                    {user.displayName}
                  </p>
                  <p className="text-white/70 text-sm truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogoutConfirmation}
                  className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-colors duration-200 text-white"
                >
                  <CiLogout className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex gap-2">
            <Link
              to={"/login"}
              className="btn hover:opacity-90 transition-all duration-200 hover:scale-105 bg-white text-primary border-none flex items-center gap-2"
            >
              <FaUserCircle className="text-primary" />
              Login
            </Link>
            <Link
              to={"/register"}
              className="btn hover:opacity-90 transition-all duration-200 hover:scale-105 bg-accent text-white border-none flex items-center gap-2"
            >
              <FaUserCircle className="text-white" />
              Register
            </Link>
          </div>
        )}

        <button
          className="lg:hidden text-white hover:scale-110 transition-transform duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full hover:opacity-90 transition-all duration-200 hover:scale-110 ${
            darkMode ? "bg-white text-gray-900" : "bg-white text-primary"
          }`}
        >
          {darkMode ? <CiLight size={20} /> : <MdOutlineDarkMode size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute right-0 mt-2 top-full flex flex-col rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200 ${
            darkMode
              ? "bg-gray-800 border border-gray-600"
              : "bg-primary border border-white/20"
          }`}
        >
          {links}
        </div>
      )}
    </nav>
  );
};

export default Header;
