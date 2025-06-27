import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";

const useAuth = () => {
  const userInfo = useContext(AuthContext);
  return userInfo;
};

export default useAuth;
