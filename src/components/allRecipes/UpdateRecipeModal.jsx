import React, { useState } from "react";
import {
  FaTimes,
  FaUtensils,
  FaImage,
  FaHeading,
  FaList,
  FaBookOpen,
  FaGlobe,
  FaClock,
  FaCheckSquare,
} from "react-icons/fa";

const cuisineOptions = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

const UpdateRecipeModal = ({ onUpdate, setIsOpen, recipe }) => {
  const [formData, setFormData] = useState({
    image: recipe.image,
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cuisine: recipe.cuisine,
    prepTime: recipe.prepTime,
    categories: [...recipe.categories],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((c) => c !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData, recipe._id);
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white md:mt-8 dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={() => setIsOpen((pre) => !pre)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center dark:text-gray-200 gap-2">
          <FaUtensils className="text-red-500" />
          Update Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6  p-6 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
              <FaImage className="text-blue-500" />
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
              <FaHeading className="text-blue-500" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              className="w-full p-2 border border-gray-300 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1 flex items-center gap-2">
              <FaList className="text-blue-500" />
              Ingredients
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List ingredients"
              className="w-full p-2 border dark:text-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaBookOpen className="text-blue-500" />
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Step-by-step instructions"
              className="w-full p-2 border border-gray-300 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1 flex items-center gap-2">
              <FaGlobe className="text-blue-500" />
              Cuisine Type
            </label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cuisineOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1 flex items-center gap-2">
              <FaClock className="text-blue-500" />
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="e.g. 30"
              min="1"
              className="w-full p-2 border border-gray-300 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-2 flex items-center gap-2">
              <FaCheckSquare className="text-blue-500" />
              Categories
            </label>
            <div className="flex flex-wrap gap-4">
              {categoryOptions.map((cat) => (
                <label
                  key={cat}
                  className="flex dark:text-gray-200 items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    checked={formData.categories.includes(cat)}
                    onChange={handleChange}
                    className="accent-blue-600 dark:text-gray-200"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600  hover:bg-blue-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition duration-200"
          >
            <FaUtensils />
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipeModal;
