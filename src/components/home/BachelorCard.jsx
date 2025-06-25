import { FiClock, FiPlus, FiZap, FiBookOpen, FiCoffee } from "react-icons/fi";

const BachelorCard = ({ recipe }) => {
  return (
    <div className="dark:bg-gray-800 bg-white dark:text-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto my-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-20 h-20 rounded-lg object-cover border dark:border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-bold secondary-font mb-1">
            {recipe.title}
          </h2>
          <div className="flex items-center gap-2 text-sm dark:text-gray-400">
            <FiClock className="inline-block" />
            <span>{recipe.totalTime}</span>
            <span className="mx-1">•</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <p className="dark:text-gray-300 mb-6 text-sm italic">
        {recipe.description}
      </p>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FiPlus className="w-4 h-4 dark:text-gray-400" />
          Ingredients
        </h3>
        <ul className="space-y-2 text-sm">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center gap-2 dark:text-gray-300"
            >
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              {`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FiZap className="w-4 h-4 dark:text-gray-400" />
          Instructions
        </h3>
        <ol className="space-y-3 text-sm list-decimal list-inside dark:text-gray-300">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {recipe.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300 flex items-center gap-1"
          >
            {tag === "breakfast" && <FiCoffee className="w-3 h-3" />}
            {tag === "dinner" && <FiBookOpen className="w-3 h-3" />}#{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BachelorCard;
