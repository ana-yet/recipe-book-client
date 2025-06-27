import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Slide } from "react-awesome-reveal";
import BeginnerRecipeCard from "./BeginnerRecipeCard";

const BeginnerRecipe = () => {
  const [beginnerData, setBeginnerData] = useState([]);
  // console.log(qurbaniData);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_serverApi}/beginner`)
      .then((res) => res.json())
      .then((data) => {
        setBeginnerData(data);
      });
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center my-3.5">
        <Slide
          triggerOnce
          className="text-xl md:text-3xl font-bold font-primary text-primary dark: dark:text-gray-200"
        >
          Beginner Friendly
        </Slide>
        <p className="border-2 border-red-500 w-14 mx-auto rounded-full my-2"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-5 ">
        {beginnerData.map((beginner) => (
          <BeginnerRecipeCard beginner={beginner} key={nanoid()} />
        ))}
      </div>
    </section>
  );
};

export default BeginnerRecipe;
