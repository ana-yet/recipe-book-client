import React from "react";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import useAuth from "../../../hook/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-3">
        <div className="bg-primary text-white dark:bg-primary p-6 flex flex-col items-center justify-center relative">
          <div className="relative group">
            <img
              src={
                user?.photoURL || "https://i.ibb.co/SnP7FGL/default-user.jpg"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-secondary"
            />
            <button className="absolute bottom-1 right-1 bg-accent p-2 rounded-full hover:bg-accent/80 transition-opacity opacity-0 group-hover:opacity-100">
              <FaCamera size={14} />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-bold">
            {user?.displayName || "User"}
          </h2>
          <p className="text-sm text-secondary/90 dark:text-secondary">
            Firebase User
          </p>
        </div>

        <div className="md:col-span-2 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4 border-b border-primary/30 pb-2">
            Account Details
          </h2>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-secondary/70">
                Name
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {user?.displayName || "N/A"}
              </p>
            </div>
            <button className="text-primary hover:text-primary/70">
              <FaEdit className="inline mr-1" /> Edit
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-secondary/70">
                Email
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {user?.email || "N/A"}
              </p>
            </div>
            <button className="text-primary hover:text-primary/70">
              <FaEdit className="inline mr-1" /> Edit
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-secondary/70">
                Last Login
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90">
              Change Password
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
