import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import BachelorCard from "./BachelorCard";
import { Slide } from "react-awesome-reveal";

const Bachelor = () => {
  const [bachelorData, setBachelorData] = useState([]);
  //   console.log(bachelorData);

  useEffect(() => {
    fetch("bachelor.json")
      .then((res) => res.json())
      .then((data) => {
        setBachelorData(data);
      });
  }, []);
  return (
    <section className="my-7">
      <div className="flex flex-col items-center justify-center my-3.5">
        <Slide className="text-xl md:text-3xl font-bold secondary-font text-black dark: dark:text-gray-200">
          Bachelor Special
        </Slide>
        <p className="border-2 border-red-500 w-14 mx-auto rounded-full my-2"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-5 ">
        {bachelorData.map((recipe) => (
          <BachelorCard recipe={recipe} key={nanoid()} />
        ))}
      </div>
    </section>
  );
};

export default Bachelor;
