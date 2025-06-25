import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthContext";
import { Helmet } from "react-helmet-async";

const RecipeDetails = () => {
  const dbRecipe = useLoaderData();
  const [recipe, setRecipe] = useState({ ...dbRecipe });
  const { user } = useContext(AuthContext);

  const {
    image,
    title,
    ingredients,
    instructions,
    cuisine,
    prepTime,
    categories,
    likes,
  } = recipe || [];

  const updateLike = (id) => {
    if (recipe.email === user.email) {
      return toast.error("You can not like your own recipe");
    }

    const totalLike = {
      likes: recipe.likes + 1,
    };

    fetch(`https://recipe-server-three-bay.vercel.app/recipe/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(totalLike),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          const updateData = {
            ...recipe,
            ...totalLike,
          };
          setRecipe(updateData);
          // console.log(updateData);
        }
      });
  };

  return (
    <div className=" w-11/12 md:w-9/12 mx-auto bg-white rounded-md my-4 md:my-10 shadow-md overflow-hidden">
      <Helmet>
        <title>RecipeBook || Recipe Details</title>
        <meta name="description" content="Welcome to the home page" />
      </Helmet>
      <div className="p-4 text-base text-gray-600 font-medium border-b">
        {likes} people interested in this recipe
      </div>

      <img src={image} alt={title} className="w-full h-64 object-cover" />

      <div className="p-6 space-y-4 flex">
        <div className=" flex-1 flex flex-col justify-center items-center ">
          <h1 className="text-2xl font-bold secondary-font text-gray-800">
            {title}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <span className="font-semibold">Cuisine:</span> {cuisine}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold">Prep Time:</span> {prepTime} mins
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories?.map((cat, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          <button
            onClick={() => updateLike(recipe._id)}
            className="btn bg-none rounded-lg my-2 inline-flex"
          >
            <FaHeart /> <span>Like</span>
          </button>
        </div>

        <div className="flex-1 text-center">
          <div>
            <h2 className="font-semibold text-gray-700">Ingredients</h2>
            <p className="text-gray-600">{ingredients}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">Instructions</h2>
            <p className="text-gray-600">{instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
