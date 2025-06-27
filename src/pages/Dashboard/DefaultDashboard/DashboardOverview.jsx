import React, { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    myRecipes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [users, recipes, myRecipes] = await Promise.all([
        fetch(`${import.meta.env.VITE_serverApi}/stats/users`).then((res) =>
          res.json()
        ),
        fetch(`${import.meta.env.VITE_serverApi}/stats/recipes`).then((res) =>
          res.json()
        ),
        fetch(
          `${import.meta.env.VITE_serverApi}/stats/my-recipes/${user.email}`
        ).then((res) => res.json()),
      ]);
      setStats({
        totalUsers: users.totalUsers,
        totalRecipes: recipes.totalRecipes,
        myRecipes: myRecipes.myRecipes,
      });
    };
    fetchStats();
  }, [user.email]);

  console.log(stats);
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow text-center dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primary">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-secondary p-6 rounded-lg shadow text-center dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primary">Total Recipes</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {stats.totalRecipes}
          </p>
        </div>

        <div className="bg-secondary p-6 rounded-lg shadow text-center dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primary">My Recipes</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {stats.myRecipes}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="text-xl font-semibold text-primary mb-2">
          Welcome, {user.displayName}
        </h4>
        <p className="text-gray-700 dark:text-secondary/80">{user.email}</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
