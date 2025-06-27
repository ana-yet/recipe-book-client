import { useContext } from "react";
import TopRecipe from "../components/home/TopRecipe";
import Loader from "./Loader";
import { AuthContext } from "../AuthProvider/AuthContext";
import Banner from "../components/header/Banner";
import Qurbani from "../components/home/Qurbani";
import Bachelor from "../components/home/Bachelor";
import { Helmet } from "react-helmet-async";
import HowToUse from "../components/home/HowToUse";

const Home = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>RecipeBook || Home</title>
        <meta name="description" content="Welcome to the home page" />
      </Helmet>

      <section>
        <Banner />
      </section>
      <section className="max-w-screen-2xl  mx-auto my-20 md:my-28">
        <HowToUse />
      </section>

      <section className="max-w-screen-2xl  mx-auto my-20 md:my-28">
        <TopRecipe />
      </section>
      <section className="max-w-screen-2xl  mx-auto my-14 md:my-16 ">
        <Bachelor />
      </section>
      <section className="w-11/12 md:w-10/12 mx-auto my-14 md:my-16 ">
        <Qurbani />
      </section>
    </div>
  );
};

export default Home;
