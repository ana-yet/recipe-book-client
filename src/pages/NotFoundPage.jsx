import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="mb-8 animate-bounce">
          <span className="text-9xl font-bold text-orange-600 drop-shadow-md">
            4<span className="text-yellow-500">0</span>4
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            🥧 Recipe Not Found!
          </h1>

          <p className="text-lg text-gray-600">
            Oops! It looks like this page has gone missing like a secret
            ingredient...
          </p>

          <div className="my-8 flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-orange-200 rounded-full animate-pulse"></div>
              <div className="relative z-10 text-6xl pt-8">🍳</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={"/"}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Back to Kitchen
            </Link>

            <Link
              to={"/allRecipes"}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold transition-colors duration-300"
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
