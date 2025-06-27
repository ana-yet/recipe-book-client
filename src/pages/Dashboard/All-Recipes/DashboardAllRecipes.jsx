import React from "react";
import useAuth from "../../../hook/useAuth";
import AllRecipeTable from "./AllRecipesTable";

const DashboardAllRecipes = () => {
  const { allRecipes } = useAuth();
  return (
    <div>
      <AllRecipeTable recipes={allRecipes} />
    </div>
  );
};

export default DashboardAllRecipes;
