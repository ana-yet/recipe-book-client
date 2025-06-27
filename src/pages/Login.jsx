import { useContext, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import loginVector from "../assets/login.svg";

const LoginVector = () => (
  <img
    src={loginVector}
    alt="Login Illustration"
    className="w-full max-w-md h-auto"
  />
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { singInUser, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    singInUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Login Successfully!",
          icon: "success",
          draggable: true,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from);
      })
      .catch(() => {
        toast.error("Login unsuccessful!");
      });
  };

  const googleLogin = () => {
    googleSignin()
      .then(() => {
        Swal.fire({
          title: "Login Successfully!",
          icon: "success",
          draggable: true,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from);
      })
      .catch(() => {
        toast.error("Login unsuccessful!");
      });
  };

  return (
    <div className="min-h-[calc(100vh-250px)] max-w-screen-2xl mx-auto  flex flex-col my-4 rounded-2xl md:flex-row items-center justify-center bg-secondary/10 dark:bg-gray-900 transition py-12">
      <Helmet>
        <title>RecipeBook || Login</title>
        <meta name="description" content="Login to RecipeBook" />
      </Helmet>

      <div className="hidden md:block md:w-1/2 mr-12">
        <LoginVector />
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-secondary mb-6 font-primary">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary dark:text-secondary mb-1">
              Email
            </label>
            <div className="flex items-center border border-primary rounded-md px-3 py-2 mt-1 bg-white dark:bg-gray-700">
              <FaEnvelope className="text-primary dark:text-secondary mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-primary dark:text-secondary focus:outline-none placeholder-primary/70 dark:placeholder-secondary/70"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary dark:text-secondary mb-1">
              Password
            </label>
            <div className="flex items-center border border-primary rounded-md px-3 py-2 mt-1 bg-white dark:bg-gray-700">
              <FaLock className="text-primary dark:text-secondary mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-primary dark:text-secondary focus:outline-none placeholder-primary/70 dark:placeholder-secondary/70"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-primary dark:text-secondary focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <a
              href="#"
              className="text-accent hover:underline dark:text-accent"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-[#3a614a] text-white py-2 rounded-md transition-colors font-semibold"
          >
            Login
          </button>
        </form>

        <button
          onClick={googleLogin}
          className="btn w-full my-4 bg-secondary dark:bg-gray-700 text-primary dark:text-secondary border border-primary dark:border-secondary hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <g>
              <path d="M0 0h512v512H0z" fill="none" />
              <path
                fill="#EA4335"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285F4"
                d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#FBBC05"
                d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#34A853"
                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Login with Google
        </button>

        <p className="mt-4 text-sm text-primary dark:text-secondary text-center">
          New to this website?{" "}
          <Link
            state={{ from: location.state?.from }}
            to="/register"
            className="text-accent hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
