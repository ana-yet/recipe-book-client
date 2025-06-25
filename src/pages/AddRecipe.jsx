import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddRecipe = () => {
  const { setAllRecipes, allRecipes, user } = useContext(AuthContext);

  const [form, setForm] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    prepTime: "",
    categories: [],
    likes: 0,
    email: user.email,
  });

  const categoriesList = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];
  const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitRecipe = (e) => {
    e.preventDefault();
    // console.log(form);

    fetch("https://recipe-server-three-bay.vercel.app/recipe", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          const newData = [...allRecipes, form];
          setAllRecipes(newData);
          Swal.fire({
            title: "Recipe added Successfully!",
            icon: "success",
            draggable: true,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>RecipeBook || Add Recipe</title>
        <meta name="description" content="Welcome to the home page" />
      </Helmet>
      <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold mb-6 text-center secondary-font">
        Add a New Recipe
      </h1>
      <form onSubmit={handleSubmitRecipe} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border px-4 text-gray-800 dark:text-gray-200 py-2 rounded-md"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 text-gray-800 dark:text-gray-200 py-2 rounded-md"
            placeholder="Recipe Title"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            className="w-full border text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
            rows="4"
            placeholder="List  ingredients separated by commas"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            className="w-full border px-4 text-gray-800 dark:text-gray-200 py-2 rounded-md"
            rows="4"
            placeholder="Step-by-step preparation"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Cuisine Type
          </label>
          <select
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option className="text-gray-800 dark:text-gray-200" value="">
              Select Cuisine
            </option>
            {cuisineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-800 dark:text-gray-200 font-medium">
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            name="prepTime"
            value={form.prepTime}
            onChange={handleChange}
            className="w-full border text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
            placeholder="e.g. 30"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-800 dark:text-gray-200 font-medium">
            Categories
          </label>
          <div className="flex flex-wrap gap-4">
            {categoriesList.map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  className="text-gray-800 dark:text-gray-200"
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={form.categories.includes(cat)}
                  onChange={handleChange}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Like Count
          </label>
          <input
            type="number"
            name="likes"
            value={form.likes}
            readOnly
            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-800 dark:text-gray-200 cursor-not-allowed"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-black text-white  dark:text-gray-200 px-6 py-2 rounded hover:bg-gray-800"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
