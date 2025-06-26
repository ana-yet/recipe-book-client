import { FaHeart, FaRegClock, FaUtensils } from "react-icons/fa";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const RecipesCard = ({ recipe, updateLike }) => {
  if (!recipe) return <h1>loading...</h1>;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-primary/20 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image || "https://i.ibb.co/Jw2HZq30/default.jpg"}
          alt={recipe.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute top-2 right-2 bg-primary/90 dark:bg-gray-700 rounded-full px-3 py-1 flex items-center">
          <FaHeart className="text-accent mr-1" />
          <span className="text-sm text-secondary dark:text-secondary font-medium">
            {recipe.likes}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-secondary font-primary dark:text-secondary mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-primary dark:text-secondary/80">
            <FaUtensils className="mr-1" />
            <span className="text-sm">{recipe.cuisine}</span>
          </div>
          <div className="flex items-center text-primary dark:text-secondary/80">
            <FaRegClock className="mr-1" />
            <span className="text-sm">{recipe.prepTime}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            data-tooltip-id="details"
            to={`../recipe-details/${recipe._id}`}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            See Details
          </Link>
          <Tooltip
            place="top-start"
            id="details"
            className="!bg-primary !text-secondary"
          >
            Click to view more details
          </Tooltip>

          <button
            data-tooltip-id="like"
            onClick={() => updateLike(recipe._id)}
            className="text-accent hover:text-accent/80 flex items-center gap-1"
          >
            <FaHeart />
            <span>Like</span>
          </button>
          <Tooltip
            place="top-end"
            id="like"
            className="!bg-primary !text-secondary"
          >
            Click to like this recipe
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default RecipesCard;
