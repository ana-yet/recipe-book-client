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
    fetch(`${import.meta.env.VITE_serverApi}/top-recipes`)
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

  return (
    <div>
      <div className="flex flex-col justify-center mb-6 ">
        <Slide className="flex gap-1 md:text-3xl text-2xl font-bold secondary-font justify-center font-primary  dark:text-dark-primary ">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <ImFire className="text-secondary dark:text-accent/90" />
            <span className="text-primary dark:text-secondary">Top Recipe</span>
          </h1>
        </Slide>
        <p className="border-2 w-12 mx-auto border-accent my-3.5 rounded-2xl "></p>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 md:gap-8 gap-3">
        {recipeTop.map((recipe, index) => (
          <TopRecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <div className="flex justify-center my-6 transform transition duration-300 hover:scale-105 hover:-translate-y-1">
        <Link
          to={"/allRecipes"}
          className="btn bg-primary   hover:bg-primary/90 rounded-xl text-white font-medium transition-colors duration-200 "
        >
          See All Recipes
        </Link>
      </div>
    </div>
  );
};

export default TopRecipe;
