import React, { useState } from "react";
import { FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import UpdateRecipeModal from "../allRecipes/UpdateRecipeModal";
import Swal from "sweetalert2";
import { TiMediaRecordOutline } from "react-icons/ti";
import { IoTimeOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

const MyRecipesCard = ({ myRec, setMyRecipes, myRecipes }) => {
  const [recipe, setRecipe] = useState({ ...myRec });
  const [isOpen, setIsOpen] = useState(false);

  const onUpdate = (formData, id) => {
    // console.log(formData);
    // console.log(id);

    fetch(`${import.meta.env.VITE_serverApi}/recipe/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Recipe Updated Successfully!",
            icon: "success",
            draggable: true,
            timer: 1500,
          });
          setIsOpen((pre) => !pre);
          setRecipe(formData);
        }
      });
  };

  const onDelete = (id) => {
    fetch(`${import.meta.env.VITE_serverApi}/recipe/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount) {
          Swal.fire({
            title: "Recipe Deleted Successfully!",
            icon: "success",
            draggable: true,
            timer: 1500,
          });
          const newMyRecipe = myRecipes.filter((rec) => rec._id !== id);
          setMyRecipes(newMyRecipe);
        }
      });
  };
  if (!recipe) return <h1>loading....</h1>;
  return (
    <div className="  shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 p-4">
      <img
        src={recipe?.image}
        alt={recipe?.title}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="mt-4 space-y-2">
        <h2 className="text-2xl font-bold secondary-font text-gray-800 dark:text-gray-200">
          {recipe.title}
        </h2>

        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            🧂 Ingredients:{" "}
          </span>
          {recipe.ingredients.slice(0, 100)}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            📋 Instructions:{" "}
          </span>
          {recipe.instructions.slice(0, 100)}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold">🌍 Cuisine: </span>
          {recipe.cuisine}
        </p>
        <p className="text-gray-800 dark:text-gray-200 ">
          <span className="font-semibold flex items-center gap-2">
            <IoTimeOutline size={20} />
            Prep Time:
          </span>{" "}
          {recipe.prepTime}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold ">📂 Category:</span>
          {recipe.categories && recipe.categories.length > 0
            ? recipe.categories.join(", ")
            : "None"}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600 flex items-center gap-1">
            <FaHeart className="text-red-500" /> {recipe.likes}
          </span>
          <div className="space-x-2">
            <button
              data-tooltip-id="update"
              onClick={() => setIsOpen((pre) => !pre)}
              className="px-3 py-1 mb-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-1"
            >
              <FaEdit /> Update
            </button>
            <Tooltip place="top-start" id="update">
              Click here for update the recipe
            </Tooltip>
            <button
              data-tooltip-id="delete"
              onClick={() => onDelete(recipe._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
            <Tooltip place="top-start" id="delete">
              Click here for Delete this recipe
            </Tooltip>
          </div>
        </div>
      </div>
      {isOpen && (
        <UpdateRecipeModal
          recipe={recipe}
          setIsOpen={setIsOpen}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default MyRecipesCard;
