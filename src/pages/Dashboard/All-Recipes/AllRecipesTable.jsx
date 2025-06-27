import React from "react";
import { useNavigate } from "react-router";

const AllRecipeTable = ({ recipes }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-primary text-3xl font-bold mb-6">Recipe List</h2>

      <div className="overflow-x-auto border border-primary/30 rounded-lg">
        <table className="min-w-full divide-y divide-primary/20 bg-secondary/50 dark:bg-gray-800">
          <thead className="bg-primary/10 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-primary font-semibold uppercase text-sm">
                Title
              </th>
              <th className="px-6 py-3 text-left text-primary font-semibold uppercase text-sm">
                Cuisine
              </th>
              <th className="px-6 py-3 text-left text-primary font-semibold uppercase text-sm">
                Difficulty
              </th>
              <th className="px-6 py-3 text-center text-primary font-semibold uppercase text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/30">
            {recipes.map((recipe) => (
              <tr
                key={recipe._id}
                className="hover:bg-primary/10 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-secondary font-medium">
                  {recipe.title}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                  {recipe.cuisine}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-secondary/80">
                  {recipe.difficulty}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleViewDetails(recipe._id)}
                    className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary/90 transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecipeTable;
