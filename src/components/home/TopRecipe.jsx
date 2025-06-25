import { ImFire } from "react-icons/im";
import TopRecipeCard from "./TopRecipeCard";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import SkeletonCard from "../../pages/SkeletonCard";
import { Slide } from "react-awesome-reveal";

const TopRecipe = () => {
  const [recipeTop, setRecipeTop] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    fetch("https://recipe-server-three-bay.vercel.app/top-recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipeTop(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  if (load) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center my-10">
        <Slide className="flex gap-1 md:text-3xl text-2xl font-bold secondary-font justify-center  dark:text-white/80 ">
          <h1 className="flex gap-2">
            <ImFire className="text-red-500" />
            Top Recipe
          </h1>
        </Slide>
        <p className="border-2 w-12 mx-auto border-red-500 my-3.5 rounded-2xl "></p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-3">
        {recipeTop.map((recipe, index) => (
          <TopRecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <div className="flex justify-center my-5 transform transition duration-300 hover:scale-105 hover:-translate-y-1">
        <Link
          to={"/allRecipes"}
          className="btn bg-black text-white font-medium secondary-font dark:text-white/80 dark:bg-gray-500 "
        >
          See All Recipe
        </Link>
      </div>
    </div>
  );
};

export default TopRecipe;
