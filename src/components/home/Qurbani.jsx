import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import QurbaniCard from "./QurbaniCard";
import { Slide } from "react-awesome-reveal";

const Qurbani = () => {
  const [qurbaniData, setQurbaniData] = useState([]);
  // console.log(qurbaniData);

  useEffect(() => {
    fetch("qurbani.json")
      .then((res) => res.json())
      .then((data) => {
        setQurbaniData(data);
      });
  }, []);

  return (
    <section className="my-7">
      <div className="flex flex-col items-center justify-center my-3.5">
        <Slide
          triggerOnce
          className="text-xl md:text-3xl font-bold secondary-font text-black dark: dark:text-gray-200"
        >
          Qurbani Special
        </Slide>
        <p className="border-2 border-red-500 w-14 mx-auto rounded-full my-2"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-7 ">
        {qurbaniData.map((recipe) => (
          <QurbaniCard recipe={recipe} key={nanoid()} />
        ))}
      </div>
    </section>
  );
};

export default Qurbani;
