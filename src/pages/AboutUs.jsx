import { FaUsers, FaRegSmileBeam, FaBookOpen } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-[calc(100vh-350px)] max-w-screen-2xl mx-auto my-4 rounded-2xl bg-secondary/10  dark:bg-gray-900 py-16 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-secondary font-primary mb-2">
          About Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Welcome to RecipeBook – your destination for delicious, easy, and
          inspiring recipes from cooks around the world.
        </p>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Community */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all">
          <FaUsers className="text-4xl mx-auto mb-4 text-primary dark:text-accent" />
          <h3 className="text-xl font-semibold text-primary dark:text-secondary font-primary">
            Community Driven
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Share your favorite recipes and explore culinary creativity from
            around the globe.
          </p>
        </div>

        {/* Passion */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all">
          <FaRegSmileBeam className="text-4xl mx-auto mb-4 text-primary dark:text-accent" />
          <h3 className="text-xl font-semibold text-primary dark:text-secondary font-primary">
            Cook with Passion
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            We celebrate the joy of cooking and the passion that turns simple
            meals into memories.
          </p>
        </div>

        {/* Knowledge */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all">
          <FaBookOpen className="text-4xl mx-auto mb-4 text-primary dark:text-accent" />
          <h3 className="text-xl font-semibold text-primary dark:text-secondary font-primary">
            Learn & Explore
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Expand your cooking knowledge with diverse cuisines, techniques, and
            helpful tips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
