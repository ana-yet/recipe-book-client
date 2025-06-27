import React from "react";
import { FaBookOpen, FaHeart, FaPlusCircle, FaSearch } from "react-icons/fa";

const HowToUse = () => {
  const steps = [
    {
      icon: <FaSearch className="w-10 h-10 text-primary" />,
      title: "1. Explore Thousands of Recipes",
      description:
        "Use our powerful search bar and filters to discover new and exciting recipes from various cuisines around the world. Find the perfect meal for any occasion.",
    },
    {
      icon: <FaBookOpen className="w-10 h-10 text-primary" />,
      title: "2. View Detailed Instructions",
      description:
        "Click on any recipe to see a detailed view with ingredients, step-by-step instructions, prep times, calorie counts, and even video tutorials.",
    },
    {
      icon: <FaPlusCircle className="w-10 h-10 text-primary" />,
      title: "3. Add Your Own Recipes",
      description:
        "Share your culinary creations with the community! Our easy-to-use form lets you add your own recipes, including photos and all the necessary details.",
    },
    {
      icon: <FaHeart className="w-10 h-10 text-primary" />,
      title: "4. Like and Share",
      description:
        "Show appreciation for recipes by giving them a like. You can also share your favorite finds with friends and family via social media or a direct link.",
    },
  ];

  return (
    <div>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header Section --- */}
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-primary font-extrabold text-secondary tracking-tight secondary-font">
            Your Culinary Journey Starts Here
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Follow these simple steps to make the most out of our recipe book.
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                  <div className="-mt-6">
                    <div>
                      {/* Icon with a styled background */}
                      <span className="inline-flex items-center justify-center p-3 bg-primary-light rounded-md shadow-lg">
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-bold text-secondary tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
