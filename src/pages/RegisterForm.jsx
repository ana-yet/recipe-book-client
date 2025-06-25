import React, { useContext, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const RegisterForm = () => {
  const { createUser, setUser, googleSignin } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    setError("");
    if (!pattern.test(formData.password)) {
      return setError(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter,"
      );
    }

    createUser(formData.email, formData.password)
      .then((res) => {
        // console.log(res);
        const user = {
          email: res.user.email,
          photoUrl: formData.imageUrl,
          name: formData.name,
          creationTime: res.user.metadata.creationTime,
          lastSignInTime: res.user.metadata.lastSignInTime,
        };
        fetch("https://recipe-server-three-bay.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((result) => {
            if (!result.ok) {
              throw new Error("Network response was not ok");
            }
            return result.json();
          })
          .then((data) => {
            if (data.insertedId) {
              setUser(user);
              Swal.fire({
                title: "User Register successfully!",
                icon: "success",
                draggable: true,
                timer: 1500,
              });
              navigate(from);
            }
            // console.log("data after db", data);
          })
          .catch((error) => {
            console.error("Error saving user data to database:", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("User Register unsuccessful!");
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
        });
        navigate(from);
      })
      .catch(() => {
        toast.error("Login unsuccessful!");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4">
      <Helmet>
        <title>RecipeBook || Register</title>
        <meta name="description" content="Welcome to the home page" />
      </Helmet>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
            Sign Up for Recipe Book 🍲
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-orange-400">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Image URL</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-orange-400">
              <FaImage className="text-gray-400 mr-2" />
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/photo.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-orange-400">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-orange-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 ml-2 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error ? <p className="text-red-500 text-sm ">{error}</p> : ""}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <button
          onClick={() => googleLogin()}
          className="btn w-full my-2 bg-white text-black border-[#e5e5e5] hover:bg-gray-100"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
