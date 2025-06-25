import RecipesCard from "../components/allRecipes/RecipesCard";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import SkeletonCard from "./SkeletonCard";
import { Helmet } from "react-helmet-async";

const AllRecipes = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Cuisine");
  const [categoryData, setCategoryData] = useState([]);
  const [load, setLoad] = useState(true);

  const categories = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
  // console.log(categoryData);

  const toggleDropdown = () => setOpen(!open);
  const handleSelect = (category) => {
    setSelected(category);
    // console.log(category);
    setOpen(false);
  };

  useEffect(() => {
    setLoad(true);
    const recipeData = async () => {
      const url =
        selected === "All Cuisine"
          ? "https://recipe-server-three-bay.vercel.app/recipe/"
          : `https://recipe-server-three-bay.vercel.app/recipe/cuisine/${selected}`;
      try {
        const res = await fetch(url);
        const result = await res.json();
        setCategoryData(result);
        setLoad(false);
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
      }
    };
    recipeData();
  }, [selected]);

  if (load) {
    return (
      <div className="grid mt-20 grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 md:w-10/12 w-11/12 mx-auto">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  const updateLike = (id) => {
    const currentLike = categoryData.find((dat) => dat._id === id);
    // console.log(currentLike);
    if (currentLike.email === user.email) {
      return toast.error("You can not like your own recipe");
    }
    const totalLike = {
      likes: currentLike.likes + 1,
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
          const updateData = categoryData.map((cat) =>
            cat._id === id ? { ...cat, ...totalLike } : cat
          );
          setCategoryData(updateData);
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>RecipeBook || All Recipes</title>
        <meta name="description" content="Welcome to the home page" />
      </Helmet>
      <div className="flex justify-center my-2">
        <div className="relative inline-block text-left ">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center justify-between w-56  px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-2xl shadow-md hover:bg-blue-50 transition-all"
          >
            {selected}
            <FiChevronDown className="w-4 h-4 ml-2 text-gray-500" />
          </button>

          {open && (
            <div className="absolute z-10 mt-2 w-56 bg-white dark:bg-gray-500  border border-gray-200  rounded-2xl shadow-xl">
              {selected !== "All Cuisine" ? (
                <button
                  onClick={() => handleSelect("All Cuisine")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 rounded-xl transition"
                >
                  All Cuisine
                </button>
              ) : null}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-300 dark:hover:text-gray-800 rounded-xl transition"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {categoryData?.map((recipe) => (
          <RecipesCard updateLike={updateLike} recipe={recipe} key={nanoid()} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
