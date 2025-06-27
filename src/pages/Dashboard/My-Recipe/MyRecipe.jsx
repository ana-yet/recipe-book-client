import React, { useEffect, useState } from "react";
import RecipeTable from "./RecipeTable";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_serverApi}/myRecipes?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user.email]);

  const handleView = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_serverApi}/recipe/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount) {
          Swal.fire({
            title: "Recipe Deleted Successfully!",
            icon: "success",
            draggable: true,
            timer: 1500,
          });
          const newMyRecipe = recipes.filter((rec) => rec._id !== id);
          setRecipes(newMyRecipe);
        }
      });
  };

  // console.log(recipes);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <RecipeTable
        recipes={recipes}
        handleView={handleView}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyRecipe;
