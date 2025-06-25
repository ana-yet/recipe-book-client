import { useState } from "react";
import {
  FiClock,
  FiUsers,
  FiChevronDown,
  FiBookmark,
  FiDroplet,
} from "react-icons/fi";
import { GiCookingPot, GiKnifeFork } from "react-icons/gi";

const QurbaniCard = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className=" rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 ">
      <img
        src={recipe.image_url}
        alt={recipe.name}
        className="w-full h-56 object-cover border-b-4 border-red-500 dark:border-red-600"
      />

      <div className="p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 secondary-font dark:text-gray-200">
            {recipe.name}
          </h2>
          <GiCookingPot className="text-red-500 dark:text-red-400 text-xl" />
        </div>

        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <FiClock className="dark:text-gray-300" />
            <span>{recipe.cooking_time}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiUsers className="dark:text-gray-300" />
            <span>Serves {recipe.serving_size}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm">
            {recipe.cuisine}
          </span>
          {recipe.category.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="border-t pt-4 dark:border-gray-700">
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg"
            onClick={() => setShowIngredients(!showIngredients)}
          >
            <div className="flex items-center gap-2">
              <FiDroplet className="text-blue-500 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Ingredients
              </h3>
            </div>
            <FiChevronDown
              className={`transition-transform ${
                showIngredients ? "rotate-180" : ""
              } dark:text-gray-300`}
            />
          </div>

          {showIngredients && (
            <ul className="mt-2 pl-6 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                >
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                  <span>
                    {ingredient.quantity} {ingredient.name}
                  </span>
                  {ingredient.notes && (
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      ({ingredient.notes})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg mt-2"
            onClick={() => setShowSteps(!showSteps)}
          >
            <div className="flex items-center gap-2">
              <GiKnifeFork className="text-green-500 dark:text-green-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Preparation Steps
              </h3>
            </div>
            <FiChevronDown
              className={`transition-transform ${
                showSteps ? "rotate-180" : ""
              } dark:text-gray-300`}
            />
          </div>

          {showSteps && (
            <ol className="mt-2 pl-6 space-y-2 list-decimal text-gray-600 dark:text-gray-400">
              {recipe.preparation_steps.map((step, index) => (
                <li key={index} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QurbaniCard;
