import React, { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUtensils,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import dayjs from "dayjs";
import EditRecipeModal from "./EditRecipeModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const RecipeTable = ({ recipes, handleView, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const onDelete = (id) => {
    handleDelete(id);
  };

  const onView = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  const onEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setFormData({ ...recipe });
    setIsOpen(true);
  };

  const handleUpdate = () => {
    const id = formData._id;

    if (!id) {
      console.error("No ID found in formData");
      return;
    }

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
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Recipe Updated Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#f8f4e3",
          });
          setIsOpen(false);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Update Failed!",
          text: err.message,
          icon: "error",
          background: "#f8f4e3",
          confirmButtonColor: "#e85d75",
        });
      });
  };

  return (
    <div className="rounded-lg border border-primary/20 dark:border-gray-700 overflow-hidden">
      {recipes.length === 0 ? (
        <div className="p-8 text-center bg-secondary/50 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-secondary/80">
            No recipes found. Add your first recipe!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary/20 dark:divide-gray-700">
            <thead className="bg-primary/10 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  <FaUtensils className="inline mr-1" /> Cuisine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  <FaClock className="inline mr-1" /> Prep
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  <FaClock className="inline mr-1" /> Cook
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  <FaUsers className="inline mr-1" /> Servings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  Calories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-primary dark:text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary/50 dark:bg-gray-800 divide-y divide-primary/20 dark:divide-gray-700">
              {recipes.map((recipe) => (
                <tr
                  key={recipe._id}
                  className="hover:bg-primary/5 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={recipe.imageUrl || "https://via.placeholder.com/150"}
                      alt={recipe.title}
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-secondary">
                    {recipe.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                    {recipe.cuisine}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                    {recipe.prepTime} min
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                    {recipe.cookTime} min
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                    {recipe.servings}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : recipe.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                    {recipe.calories || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                    {dayjs(recipe.createdAt).format("MMM D, YYYY")}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onView(recipe._id)}
                      className="text-primary hover:text-primary/80"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => onEdit(recipe)}
                      className="text-primary hover:text-primary/80"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(recipe._id)}
                      className="text-accent hover:text-accent/80"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isOpen && (
        <EditRecipeModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          recipe={formData}
          setFormData={setFormData}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default RecipeTable;
