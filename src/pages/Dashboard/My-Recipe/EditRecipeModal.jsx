import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const EditRecipeModal = ({
  isOpen,
  setIsOpen,
  recipe,
  setFormData,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-secondary dark:bg-gray-800 w-full max-w-4xl rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-accent hover:text-accent/80"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
          Edit Recipe
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div>
            <label className="text-primary dark:text-secondary font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={recipe.title || ""}
              onChange={handleChange}
              className="w-full p-2 border border-primary/30 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-primary dark:text-secondary font-medium">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={recipe.imageUrl || ""}
              onChange={handleChange}
              className="w-full p-2 border border-primary/30 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-primary dark:text-secondary font-medium">
              Prep Time (min)
            </label>
            <input
              type="number"
              name="prepTime"
              value={recipe.prepTime || ""}
              onChange={handleChange}
              className="w-full p-2 border border-primary/30 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-primary dark:text-secondary font-medium">
              Cook Time (min)
            </label>
            <input
              type="number"
              name="cookTime"
              value={recipe.cookTime || ""}
              onChange={handleChange}
              className="w-full p-2 border border-primary/30 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 flex items-center gap-2"
          >
            <FaSave />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeModal;
