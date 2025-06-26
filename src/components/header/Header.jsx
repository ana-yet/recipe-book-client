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
  const [isTransparent, setIsTransparent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsTransparent(window.scrollY < window.innerHeight * 0.8);
      } else {
        setIsTransparent(false);
      }
    };

    // Initial check
    setIsTransparent(location.pathname === "/");

    // Add scroll listener for home page
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const signOutUser = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
          draggable: true,
          timer: 1500,
          background: darkMode ? "bg-dark-background" : "bg-background",
          color: darkMode ? "text-dark-content" : "text-content",
        });
        navigate("/login");
      })
      .catch(() => {
        toast.error("Sign out unsuccessful!");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `py-4 px-6 transition-colors ${
            isActive
              ? "bg-primary text-secondary dark:bg-dark-primary dark:text-dark-secondary"
              : "text-content hover:bg-primary hover:text-secondary dark:text-dark-content dark:hover:bg-dark-primary dark:hover:text-dark-secondary"
          }`
        }
      >
        HOME
      </NavLink>
      <NavLink
        to={"/allRecipes"}
        className={({ isActive }) =>
          `py-4 px-6 transition-colors ${
            isActive
              ? "bg-primary text-secondary dark:bg-dark-primary dark:text-dark-secondary"
              : "text-content hover:bg-primary hover:text-secondary dark:text-dark-content dark:hover:bg-dark-primary dark:hover:text-dark-secondary"
          }`
        }
      >
        ALL RECIPES
      </NavLink>
      <NavLink
        to={"/addRecipe"}
        className={({ isActive }) =>
          `py-4 px-6 transition-colors ${
            isActive
              ? "bg-primary text-secondary dark:bg-dark-primary dark:text-dark-secondary"
              : "text-content hover:bg-primary hover:text-secondary dark:text-dark-content dark:hover:bg-dark-primary dark:hover:text-dark-secondary"
          }`
        }
      >
        ADD RECIPE
      </NavLink>
      <NavLink
        to={"/my-recipes"}
        className={({ isActive }) =>
          `py-4 px-6 transition-colors ${
            isActive
              ? "bg-primary text-secondary dark:bg-dark-primary dark:text-dark-secondary"
              : "text-content hover:bg-primary hover:text-secondary dark:text-dark-content dark:hover:bg-dark-primary dark:hover:text-dark-secondary"
          }`
        }
      >
        MY RECIPES
      </NavLink>
    </>
  );

  return (
    <nav
      className={`transition-all duration-300 shadow-md px-4 flex items-center justify-between w-full top-0 z-50 ${
        isTransparent
          ? "bg-transparent fixed text-secondary dark:text-dark-content"
          : `sticky ${
              darkMode
                ? "bg-dark-background text-dark-content"
                : "bg-background text-content"
            }`
      }`}
    >
      <div className="text-2xl font-bold secondary-font">RecipeBook</div>

      <ul className="hidden md:flex items-center">{links}</ul>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-10 h-10 overflow-hidden rounded-full ring-2 ring-offset-2 aspect-square cursor-pointer ${
                darkMode
                  ? "ring-dark-primary ring-offset-dark-background"
                  : "ring-primary ring-offset-background"
              }`}
            >
              <img
                src={user?.photoURL}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded shadow-lg z-10 ${
                  darkMode
                    ? "bg-dark-background border-dark-primary"
                    : "bg-background border-primary"
                } border`}
              >
                <div
                  className={`px-4 py-2 border-b ${
                    darkMode ? "border-dark-primary" : "border-primary"
                  }`}
                >
                  {user.displayName}
                </div>
                <button
                  onClick={() => signOutUser()}
                  className="w-full text-left px-4 inline-flex items-center gap-1.5 py-2 hover:opacity-80 transition-opacity text-accent"
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
              className="btn hover:opacity-80 transition-opacity bg-primary text-secondary"
            >
              Login
            </Link>
            <Link
              to={"register"}
              className="btn hover:opacity-80 transition-opacity bg-accent text-secondary"
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
          className={`p-2 rounded-full hover:opacity-80 transition-opacity ${
            darkMode
              ? "bg-dark-primary text-dark-secondary"
              : "bg-primary text-secondary"
          }`}
        >
          {darkMode ? <CiLight /> : <MdOutlineDarkMode />}
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute right-0 mt-2 top-full flex flex-col rounded shadow-lg z-50 ${
            darkMode
              ? "bg-dark-background border-dark-primary"
              : "bg-background border-primary"
          } border`}
        >
          {links}
        </div>
      )}
    </nav>
  );
};

export default Header;
