import React, { useContext, useEffect, useState } from "react";
import MyRecipesCard from "../components/myRecipes/MyRecipesCard";
import { AuthContext } from "../AuthProvider/AuthContext";
import { nanoid } from "nanoid";
import SkeletonCard from "./SkeletonCard";
import NoData from "../components/NoData";

const MyRecipes = () => {
  const { allRecipes, user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const timer = setTimeout(() => {
      const myRec = allRecipes.filter((rec) => rec.email === user.email);
      setMyRecipes(myRec);
      setLoad(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [allRecipes, user]);

  //   console.log(myRecipes);

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
  if (myRecipes.length <= 0) {
    return <NoData />;
  }
  return (
    <div>
      <div className="my-7">
        <h1 className="md:text-3xl secondary-font font-bold text-gray-800 dark:text-gray-200  text-center ">
          My Recipes
        </h1>
        <p className="w-14 my-2.5 rounded-full mx-auto text-center  border-black dark:border-white border-2"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 w-11/12 md:w-10/12 mx-auto">
        {myRecipes.map((myRec) => (
          <MyRecipesCard
            myRec={myRec}
            myRecipes={myRecipes}
            setMyRecipes={setMyRecipes}
            key={nanoid()}
          />
        ))}
      </div>
    </div>
  );
};
