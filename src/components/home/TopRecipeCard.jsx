import React, { useState } from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const TopRecipeCard = ({ recipe }) => {
  const [likeCount] = useState(recipe.likes);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-primary/20 dark:border-gray-700">
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

        <span className="absolute top-3 right-3 bg-primary/90 px-2 py-1 rounded-full text-xs font-medium text-secondary dark:bg-gray-700 dark:text-secondary">
          {recipe.cuisine}
        </span>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-xl font-semibold text-secondary font-primary dark:text-secondary line-clamp-1 secondary-font">
            {recipe.title}
          </h1>
          <button
            className="text-accent hover:text-accent/80 inline-flex justify-center items-center transition-colors"
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
            className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <FaEye className="mr-2" />
            View Details
          </Link>
          <Tooltip
            place="top-start"
            id="details"
            className="!bg-primary !text-secondary"
          >
            Click here for view more details
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TopRecipeCard;
