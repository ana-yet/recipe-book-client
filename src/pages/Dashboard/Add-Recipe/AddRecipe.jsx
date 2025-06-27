import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import {
  FaImage,
  FaClock,
  FaUtensils,
  FaList,
  FaBookOpen,
  FaTag,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";

const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "Easy",
    categories: [],
    tags: "",
    notes: "",
    calories: "",
    videoUrl: "",
    email: user.email || "",
    likes: 0,
  });

  const cuisines = [
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Mediterranean",
    "American",
    "Japanese",
    "Thai",
  ];
  const categoryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Low-Carb",
    "Quick Meals",
  ];
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_serverApi}/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to add recipe");

      await Swal.fire({
        title: "Success!",
        text: "Recipe added successfully",
        icon: "success",
        background: "#f8f4e3",
        confirmButtonColor: "#4a7c59",
        timer: 2000,
      });

      navigate("/dashboard/my-recipes");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to add recipe",
        icon: "error",
        background: "#f8f4e3",
        confirmButtonColor: "#e85d75",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Helmet>
        <title>Add New Recipe | RecipeBook</title>
        <meta
          name="description"
          content="Add your delicious recipe to share with the community"
        />
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-secondary mb-6">
        Add New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image URL */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            <FaImage className="mr-2 text-primary/80" />
            Recipe Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/recipe-image.jpg"
            className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            <FaBookOpen className="mr-2 text-primary/80" />
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Delicious Recipe Name"
            className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cuisine */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              <FaUtensils className="mr-2 text-primary/80" />
              Cuisine
            </label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Cuisine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Preparation Time */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              <FaClock className="mr-2 text-primary/80" />
              Prep Time (mins)
            </label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              min="1"
              placeholder="15"
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Cooking Time */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              <FaClock className="mr-2 text-primary/80" />
              Cook Time (mins)
            </label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              min="1"
              placeholder="30"
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Servings */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              Servings
            </label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              placeholder="4"
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            Categories (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categoryOptions.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={formData.categories.includes(category)}
                  onChange={handleChange}
                  className="rounded border-primary/50 text-primary focus:ring-primary/50 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-secondary/80">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            <FaList className="mr-2 text-primary/80" />
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            rows="5"
            placeholder="List ingredients with measurements (one per line)"
            className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            rows="8"
            placeholder="Step-by-step instructions..."
            className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              <FaTag className="mr-2 text-primary/80" />
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="quick, healthy, dinner"
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Calories */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
              Calories (per serving)
            </label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              placeholder="350"
              className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>

        {/* Video URL */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            Video URL (optional)
          </label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 dark:text-secondary/80 font-medium">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any special tips or variations..."
            className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-secondary/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-secondary font-medium rounded-lg transition-colors duration-200"
          >
            <FaSave className="mr-2" />
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
