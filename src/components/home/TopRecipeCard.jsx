import React, { useState } from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const TopRecipeCard = ({ recipe }) => {
  const [likeCount] = useState(recipe.likes);

  return (
    <div className=" rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={
            recipe?.image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyMKtGNwX_OCTCTlZ6D1W9NaMs78eyil7Emw&s"
          }
          alt={recipe.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <span className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 dark:bg-gray-500">
          {recipe.cuisine}
        </span>
      </div>

      <div className="p-5 ">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 secondary-font">
            {recipe.title}
          </h1>
          <button
            className="text-pink-500 hover:text-pink-600 inline-flex justify-center items-center transition-colors"
            aria-label="Like recipe"
          >
            <FaHeart />
            <span className="ml-1 text-sm">{likeCount}</span>
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            data-tooltip-id="details"
            to={`/recipe-details/${recipe._id}`}
            className="flex items-center px-3 py-2 bg-gray-800  dark:bg-white/10 text-white dark:text-white/50 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            <FaEye className="mr-2" />
            View Details
          </Link>
          <Tooltip place="top-start" id="details">
            Click here for view more details
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TopRecipeCard;
