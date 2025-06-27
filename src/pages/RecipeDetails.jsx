import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

import { AuthContext } from "../AuthProvider/AuthContext";
import {
  FaHeart,
  FaShareAlt,
  FaRegClock,
  FaUtensils,
  FaFire,
  FaSignal,
  FaStickyNote,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

const RecipeDetails = () => {
  const dbRecipe = useLoaderData();
  const [recipe, setRecipe] = useState({ ...dbRecipe });
  const { user } = useContext(AuthContext);

  const {
    _id,
    image,
    title,
    ingredients,
    instructions,
    cuisine,
    prepTime,
    cookTime,
    servings,
    difficulty,
    categories,
    tags,
    notes,
    calories,
    videoUrl,
    email,
    likes,
    createdAt,
  } = recipe || {};

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const updateLike = (id) => {
    if (recipe.email === user?.email) {
      toast.error("You cannot like your own recipe.");
      return;
    }
    if (!user) {
      toast.warn("Please log in to like a recipe.");
      return;
    }

    const totalLike = { likes: recipe.likes + 1 };
    fetch(`${import.meta.env.VITE_serverApi}/recipe/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(totalLike),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setRecipe({ ...recipe, ...totalLike });
          toast.success("Thanks for your feedback!");
        }
      });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Recipe link copied to clipboard!");
  };

  return (
    <div className="bg-gray-50 max-w-screen-2xl mx-auto min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>RecipeBook || {title || "Recipe Details"}</title>
        <meta
          name="description"
          content={`Step-by-step instructions for making ${title}. A delicious ${cuisine} dish.`}
        />
      </Helmet>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-secondary font-primary tracking-tight secondary-font">
          Recipe Details
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Discover the secrets behind this delicious dish.
        </p>
      </div>

      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaHeart />
            <span>{likes} Likes</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-secondary secondary-font">
              {title}
            </h2>
            <p className="text-lg text-gray-600 mt-1">{cuisine} Cuisine</p>
            <div className="mt-3 flex justify-center items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FaUser /> By: {email}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> Posted: {formatDate(createdAt)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center border-y-2 border-gray-100 py-4 mb-8">
            <div className="flex flex-col items-center text-secondary">
              <FaRegClock className="text-2xl text-primary mb-1" />
              <span className="font-semibold">Prep Time</span>
              <span>{prepTime} mins</span>
            </div>
            <div className="flex flex-col items-center text-secondary">
              <GiCookingPot className="text-2xl text-primary mb-1" />
              <span className="font-semibold">Cook Time</span>
              <span>{cookTime} mins</span>
            </div>
            <div className="flex flex-col items-center text-secondary">
              <FaUtensils className="text-2xl text-primary mb-1" />
              <span className="font-semibold">Servings</span>
              <span>{servings}</span>
            </div>
            <div className="flex flex-col items-center text-secondary">
              <FaSignal className="text-2xl text-primary mb-1" />
              <span className="font-semibold">Difficulty</span>
              <span className="font-bold text-primary-dark">{difficulty}</span>
            </div>
            <div className="flex flex-col items-center text-secondary col-span-2 md:col-span-1 mt-4 md:mt-0">
              <FaFire className="text-2xl text-primary mb-1" />
              <span className="font-semibold">Calories</span>
              <span>{calories}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-secondary border-b-2 border-primary pb-2 mb-3">
                  Ingredients
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {ingredients}
                </p>
              </div>
              {notes && (
                <div>
                  <h3 className="text-xl font-semibold text-secondary border-b-2 border-primary pb-2 mb-3 flex items-center gap-2">
                    <FaStickyNote /> Notes
                  </h3>
                  <p className="text-secondary/80 italic bg-primary-light p-3 rounded-md">
                    {notes}
                  </p>
                </div>
              )}
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xl font-semibold text-secondary border-b-2 border-primary pb-2 mb-3">
                Instructions
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {instructions}
              </p>
            </div>
          </div>

          {videoUrl && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-secondary text-center mb-4">
                Watch The Video Tutorial
              </h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={videoUrl.replace("watch?v=", "embed/")}
                  title="Recipe Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="font-semibold text-secondary">Categories:</span>
              {categories?.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-primary-light text-primary-dark px-3 py-1 text-xs font-medium rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            {tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="font-semibold text-secondary">Tags:</span>
                <span className="bg-gray-200 text-secondary px-3 py-1 text-xs font-medium rounded-full">
                  {tags}
                </span>
              </div>
            )}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => updateLike(_id)}
                className="btn bg-accent hover:bg-accent-hover text-white rounded-lg inline-flex items-center gap-2 px-6 py-2 transition-transform transform hover:scale-105"
              >
                <FaHeart /> <span>Like Recipe</span>
              </button>
              <button
                onClick={handleShare}
                className="btn bg-secondary hover:bg-secondary-hover text-white rounded-lg inline-flex items-center gap-2 px-6 py-2 transition-transform transform hover:scale-105"
              >
                <FaShareAlt /> <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
