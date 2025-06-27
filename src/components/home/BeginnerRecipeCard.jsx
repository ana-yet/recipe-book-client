import React from "react";
import { Link } from "react-router";
import { FaRegClock, FaSignal, FaUsers, FaStar } from "react-icons/fa";

const BeginnerRecipeCard = ({ beginner }) => {
  const { _id, image, title, prepTime, cookTime, servings, difficulty } =
    beginner;

  const totalTime = parseInt(prepTime, 10) + parseInt(cookTime, 10);

  const placeholderImage = `https://placehold.co/600x400/D1FAE5/047857?text=${encodeURIComponent(
    title
  )}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col">
      <div className="relative">
        {/* Recipe Image */}
        <img
          className="w-full h-52 object-cover"
          src={image}
          alt={`A dish of ${title}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
        {/* Beginner Friendly Badge */}
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <FaStar />
          <span>Beginner Friendly</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {/* Recipe Title */}
        <h3 className="text-xl font-primary font-bold text-secondary truncate mb-4">
          {title}
        </h3>

        {/* Key Info for Beginners */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
          <div className="flex flex-col items-center text-secondary">
            <FaRegClock className="w-6 h-6 mb-1 text-primary" />
            <span className="font-semibold">Total Time</span>
            <span className="text-gray-500">{totalTime} mins</span>
          </div>
          <div className="flex flex-col items-center text-secondary">
            <FaSignal className="w-6 h-6 mb-1 text-primary" />
            <span className="font-semibold">Difficulty</span>
            <span className="text-gray-500">{difficulty}</span>
          </div>
          <div className="flex flex-col items-center text-secondary">
            <FaUsers className="w-6 h-6 mb-1 text-primary" />
            <span className="font-semibold">Servings</span>
            <span className="text-gray-500">{servings}</span>
          </div>
        </div>

        {/* View Recipe Button - Stays at the bottom */}
        <div className="mt-auto">
          <Link
            to={`/recipe-details/${_id}`}
            className="block w-full text-center bg-primary text-white font-bold rounded-lg px-4 py-2 text-base hover:bg-primary-dark transition-colors duration-300"
          >
            Start Cooking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeginnerRecipeCard;
