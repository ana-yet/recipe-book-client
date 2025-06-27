import { Link } from "react-router";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { GiCook } from "react-icons/gi";
import useAuth from "../../../hook/useAuth";
import { FaBars } from "react-icons/fa";

const DashboardNavbar = ({ toggleSidebar }) => {
  const { darkMode, setDarkMode } = useAuth();

  return (
    <nav className="w-full bg-secondary dark:bg-gray-800 border-b border-primary/20 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center text-primary dark:text-secondary text-xl font-bold gap-2"
      >
        <GiCook className="text-accent/50" size={28} />
        <span>
          Recipe<span className="text-white">Book</span>
        </span>
      </Link>

      {/* for mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-primary dark:text-secondary p-2 hover:bg-primary/10 rounded-md"
      >
        <FaBars size={20} />
      </button>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full hover:opacity-90 transition-all duration-200 hover:scale-110 ${
          darkMode ? "bg-white text-gray-900" : "bg-white text-primary"
        }`}
        title="Toggle Dark Mode"
      >
        {darkMode ? <CiLight size={20} /> : <MdOutlineDarkMode size={20} />}
      </button>
    </nav>
  );
};

export default DashboardNavbar;
