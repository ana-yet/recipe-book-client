import { useState, useEffect } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: "https://i.ibb.co/j9VDc895/1.jpg",
      title: "Delicious Italian Pasta",
      description: "Discover the secrets of authentic Italian cuisine",
      cta: "View Recipe",
    },
    {
      image: " https://i.ibb.co/GQ2JpL4K/2.jpg",
      title: "Healthy Breakfast Ideas",
      description: "Start your day with nutritious and tasty meals",
      cta: "Explore Now",
    },

    {
      image: "https://i.ibb.co/3m6ks8cD/3.jpg",
      title: "Homemade Desserts",
      description: "Sweet treats for every occasion",
      cta: "Get Recipes",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  md:max-h-2/5 overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative  h-[600px] flex items-end p-8 text-white">
              <div className="max-w-2xl flex flex-col items-start ">
                <Slide
                  className="text-4xl font-bold secondary-font mb-4"
                  direction="down"
                >
                  {slide.title}
                </Slide>
                <Fade
                  className="text-xl mb-6"
                  delay={1e3}
                  cascade
                  damping={1e-1}
                >
                  {slide.description}
                </Fade>

                <Link
                  to={"/allRecipes"}
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 inline-block  rounded-full font-semibold transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
