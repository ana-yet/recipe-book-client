import RecipesCard from "../components/allRecipes/RecipesCard";
import { useContext, useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import SkeletonCard from "./SkeletonCard";
import { Helmet } from "react-helmet-async";
import SearchInput from "../components/allRecipes/SearchInput";

const AllRecipes = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Cuisine");
  const [categoryData, setCategoryData] = useState([]);
  const [load, setLoad] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (category) => {
    setSelected(category);
    setOpen(false);
  };

  useEffect(() => {
    setLoad(true);
    const recipeData = async () => {
      const url =
        selected === "All Cuisine"
          ? `${import.meta.env.VITE_serverApi}/recipe/`
          : `${import.meta.env.VITE_serverApi}/recipe/cuisine/${selected}`;
      try {
        const res = await fetch(url);
        const result = await res.json();

        // ✅ Sort the result
        const sortedResult = [...result].sort((a, b) => {
          if (sortField === "title") {
            return sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          } else if (sortField === "likes") {
            return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
          } else if (sortField === "prepTime") {
            const timeA = parseInt(a.prepTime) || 0;
            const timeB = parseInt(b.prepTime) || 0;
            return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
          }
        });

        setCategoryData(sortedResult);
        setLoad(false);
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
      }
    };
    recipeData();
  }, [selected, sortOrder, sortField]);

  if (load) {
    return (
      <div className="grid mt-20 grid-cols-1 md:grid-cols-4 gap-3 md:gap-5 md:w-10/12 w-11/12 mx-auto">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const updateLike = (id) => {
    const currentLike = categoryData.find((dat) => dat._id === id);
    if (currentLike.email === user.email) {
      return toast.error("You can not like your own recipe");
    }
    const totalLike = {
      likes: currentLike.likes + 1,
    };

    fetch(`${import.meta.env.VITE_serverApi}/recipe/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(totalLike),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          const updateData = categoryData.map((cat) =>
            cat._id === id ? { ...cat, ...totalLike } : cat
          );
          setCategoryData(updateData);
        }
      });
  };

  const onSearch = (data) => {
    setSearchTerm(data.toLowerCase());
  };

  const filteredRecipes = categoryData.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Helmet>
        <title>RecipeBook || All Recipes</title>
        <meta name="description" content="Welcome to the All Recipes page" />
      </Helmet>

      <div className="w-full flex justify-center items-center gap-4 my-4 flex-wrap px-4">
        <div className="flex-grow max-w-sm">
          <SearchInput onSearch={onSearch} />
        </div>

        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-primary border border-secondary rounded-xl shadow-md hover:bg-[#7b4d39] transition-all"
          >
            {selected}
            <FiChevronDown className="w-4 h-4 ml-2 text-white" />
          </button>

          {open && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-60 bg-secondary dark:bg-[#3d3d3d] border border-gray-200 rounded-2xl shadow-2xl z-10">
              {selected !== "All Cuisine" && (
                <button
                  onClick={() => handleSelect("All Cuisine")}
                  className="w-full px-4 py-2 text-left text-sm text-white dark:text-gray-100 hover:bg-[#E8DDCB] hover:text-[#5E3A2B] dark:hover:bg-[#555] rounded-xl transition"
                >
                  All Cuisine
                </button>
              )}

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className="w-full px-4 py-2 text-left text-sm text-white dark:text-gray-100 hover:bg-[#E8DDCB] hover:text-[#5E3A2B] dark:hover:bg-[#555] rounded-xl transition"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="px-4 py-2 text-sm text-white bg-primary border border-secondary rounded-xl shadow-md"
        >
          <option value="title">Title</option>
          <option value="prepTime">Prep Time</option>
          <option value="likes">Likes</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 text-sm text-white bg-primary border border-secondary rounded-xl shadow-md focus:outline-none"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 w-11/12">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipesCard
              updateLike={updateLike}
              recipe={recipe}
              key={recipe._id}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500">
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
