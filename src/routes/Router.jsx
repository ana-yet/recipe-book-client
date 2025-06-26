import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AddRecipe from "../pages/AddRecipe";
import AllRecipes from "../pages/AllRecipes";
import RecipeDetails from "../pages/RecipeDetails";
import RegisterForm from "../pages/RegisterForm";
import MyRecipes from "../pages/MyRecipes";
import Login from "../pages/Login";
import PrivateRoute from "../AuthProvider/PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allRecipes",
        element: <AllRecipes />,
      },
      {
        path: "addRecipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "recipe-details/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_serverApi}/recipe/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
