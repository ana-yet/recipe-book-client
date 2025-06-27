import React from "react";
import { Link } from "react-router";
import { FaSignal, FaUtensils } from "react-icons/fa6";

const BachelorCard = ({ recipe }) => {
  const { _id, image, title, cuisine, difficulty } = recipe;

  const placeholderImage = `https://placehold.co/600x400/D1FAE5/047857?text=${encodeURIComponent(
    title
  )}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out group border border-gray-200 dark:border-gray-700">
      <div className="relative">
        {/* image */}
        <img
          className="w-full h-48 object-cover"
          src={image}
          alt={`A dish of ${title}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
        {/* Difficulty  */}
        <div className="absolute top-3 right-3 bg-primary/80 dark:bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <FaSignal />
          <span>{difficulty}</span>
        </div>
      </div>
      <div className="p-6">
        {/* Cuisine  */}
        <div className="flex items-center gap-2">
          <FaUtensils className="text-gray-400 dark:text-gray-500" />
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            {cuisine}
          </p>
        </div>

        {/* Recipe Title  */}
        <h3 className="mt-2 text-xl font-bold text-primary dark:text-primary/90 truncate group-hover:text-primary-dark transition-colors">
          {title}
        </h3>

        {/* View Recipe Button */}
        <Link
          to={`/recipe-details/${_id}`}
          className="block w-full text-center mt-6 bg-secondary dark:bg-secondary/90 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-secondary-hover transition-colors duration-300"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default BachelorCard;
