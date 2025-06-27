import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllRecipes from "../pages/AllRecipes";
import RecipeDetails from "../pages/RecipeDetails";
import RegisterForm from "../pages/RegisterForm";
import Login from "../pages/Login";
import PrivateRoute from "../AuthProvider/PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../layout/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddRecipe from "../pages/Dashboard/Add-Recipe/AddRecipe";
import MyRecipe from "../pages/Dashboard/My-Recipe/MyRecipe";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardAllRecipes from "../pages/Dashboard/All-Recipes/DashboardAllRecipes";

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
        path: "all-recipe",
        Component: AllRecipes,
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
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "recipes",
        element: (
          <PrivateRoute>
            <DashboardAllRecipes />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
