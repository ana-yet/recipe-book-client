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
import registerIllustration from "../assets/register.svg";

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
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter"
      );
    }

    createUser(formData.email, formData.password)
      .then((res) => {
        const user = {
          email: res.user.email,
          photoUrl: formData.imageUrl,
          name: formData.name,
          creationTime: res.user.metadata.creationTime,
          lastSignInTime: res.user.metadata.lastSignInTime,
        };
        fetch(`${import.meta.env.VITE_serverApi}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((result) => {
            if (!result.ok) throw new Error("Network response was not ok");
            return result.json();
          })
          .then((data) => {
            if (data.insertedId) {
              setUser(user);
              Swal.fire({
                title: "User Registered Successfully!",
                icon: "success",
                background: "#f8f4e3",
                timer: 1500,
              });
              navigate(from);
            }
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error("Registration unsuccessful!");
      });
  };

  const googleLogin = () => {
    googleSignin()
      .then(() => {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          background: "#f8f4e3",
          timer: 1500,
        });
        navigate(from);
      })
      .catch(() => {
        toast.error("Google login failed!");
      });
  };

  return (
    <div className="min-h-[calc(100vh-250px)] max-w-screen-2xl mx-auto my-4 rounded-2xl bg-secondary/10 flex flex-col lg:flex-row items-center justify-center p-4">
      <Helmet>
        <title>RecipeBook || Register</title>
        <meta name="description" content="Create your RecipeBook account" />
      </Helmet>

      <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img
          src={registerIllustration}
          alt="Cooking illustration"
          className="w-full max-w-md"
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Join RecipeBook 🍲
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex items-center border border-primary/30 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary/50">
              <FaUser className="text-primary/80 mr-2" />
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Profile Image URL
            </label>
            <div className="flex items-center border border-primary/30 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary/50">
              <FaImage className="text-primary/80 mr-2" />
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/photo.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-primary/30 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary/50">
              <FaEnvelope className="text-primary/80 mr-2" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-primary/30 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary/50">
              <FaLock className="text-primary/80 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-primary/80 ml-2 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-accent text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <button
          onClick={googleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5"
          >
            <path
              fill="#EA4335"
              d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
            />
            <path
              fill="#FBBC05"
              d="M90 341a192 192 0 00396 52l-62-48c-53 16-123-15-152-81z"
            />
            <path
              fill="#4285F4"
              d="M153 292c-8-25-8-48 0-73l-63-49a223 223 0 000 171z"
            />
            <path
              fill="#34A853"
              d="M153 219c22-69 116-109 179-50l55-54A223 223 0 0090 341z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
