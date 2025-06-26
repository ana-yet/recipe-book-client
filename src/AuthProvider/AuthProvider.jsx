import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { app } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_serverApi}/recipe`);
        const data = await res.json();
        setAllRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load recipes:", err);
      }
    };

    fetchRecipes();
  }, []);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // dark mode

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const value = {
    allRecipes,
    setAllRecipes,
    createUser,
    setUser,
    user,
    singInUser,
    userSignOut,
    googleSignin,
    setLoading,
    loading,
    setDarkMode,
    darkMode,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
