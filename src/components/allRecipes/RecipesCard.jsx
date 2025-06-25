import { FaHeart, FaRegClock, FaUtensils } from "react-icons/fa";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const RecipesCard = ({ recipe, updateLike }) => {
  if (!recipe) return <h1>loading...</h1>;

  return (
    <div className=" rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image || "https://i.ibb.co/Jw2HZq30/default.jpg"}
          alt="recipe.title"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute top-2 right-2 bg-white dark:bg-gray-500 bg-opacity-80 rounded-full px-3 py-1 flex items-center">
          <FaHeart className="text-red-500 mr-1" />
          <span className="text-sm dark:text-gray-200 font-medium">
            {recipe.likes}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800  dark:text-gray-200 mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center dark:text-gray-200 text-gray-600">
            <FaUtensils className="mr-1" />
            <span className="text-sm">{recipe.cuisine}</span>
          </div>
          <div className="flex items-center dark:text-gray-200 text-gray-600">
            <FaRegClock className="mr-1" />
            <span className="text-sm">{recipe.prepTime}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-200 text-sm mb-4 line-clamp-2">
          {recipe.instructions}
        </p>

        <div className="flex justify-between">
          <button>
            <Link
              data-tooltip-id="details"
              to={`../recipe-details/${recipe._id}`}
              className="w-full bg-green-600 inline-flex hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              See Details
            </Link>
            <Tooltip place="top-start" id="details">
              Click here for view more details
            </Tooltip>
          </button>
          <button
            data-tooltip-id="like"
            onClick={() => updateLike(recipe._id)}
            className="btn bg-none rounded-lg inline-flex"
          >
            <FaHeart /> <span>Like</span>
          </button>
          <Tooltip place="top-end" id="like">
            Click here for like this recipe
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default RecipesCard;
