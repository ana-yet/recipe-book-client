import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 md:h-80 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className=" flex flex-col md:flex-row justify-between items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 md:mb-0 secondary-font">
              RecipeBook
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Discover delicious recipes, cooking tips, and kitchen inspiration{" "}
              <br />
              to make every meal special. Happy cooking!
            </p>
          </div>

          <div>
            <ul className="flex flex-col gap-2">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `hover:text-gray-100 text-gray-400 ${
                    isActive
                      ? "bg-none rounded-full text-white  dark:text-white"
                      : ""
                  }`
                }
              >
                HOME
              </NavLink>
              <NavLink
                to={"/allRecipes"}
                className={({ isActive }) =>
                  `hover:text-gray-100 text-gray-400 ${
                    isActive
                      ? "bg-none rounded-full text-white  dark:text-white"
                      : ""
                  }`
                }
              >
                ALL RECIPES
              </NavLink>

              <NavLink
                to={"/addRecipe"}
                className={({ isActive }) =>
                  `hover:text-gray-100 text-gray-400 ${
                    isActive
                      ? "bg-none rounded-full text-white  dark:text-white"
                      : ""
                  }`
                }
              >
                ADD RECIPE
              </NavLink>
              <NavLink
                to={"/my-recipes"}
                className={({ isActive }) =>
                  `hover:text-gray-100 text-gray-400 ${
                    isActive
                      ? "bg-none rounded-full text-white  dark:text-white"
                      : ""
                  }`
                }
              >
                MY RECIPES
              </NavLink>
            </ul>
          </div>

          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="secondary-font mb-2">Contract Info</h3>
            <p className="text-sm text-gray-500">
              Email: amaremailnai@gmail.com
            </p>
            <p className="text-sm text-gray-500">Phone: +1 (777) bangla-4567</p>
          </div>

          <div className="">
            <h3 className="secondary-font mb-2">Connect with us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} RecipeBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
