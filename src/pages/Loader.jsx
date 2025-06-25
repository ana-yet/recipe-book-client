import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div
        className="w-24 h-24 animate-spin rounded-full shadow-lg shadow-indigo-500/50"
        style={{
          mask: "radial-gradient(circle at center, transparent 55%, black 56%)",
          background:
            "conic-gradient(from 180deg, #6366f1, #a855f7, #ec4899, #f59e0b, #6366f1)",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            mask: "radial-gradient(circle at center, transparent 65%, black 66%)",
            background:
              "conic-gradient(from 180deg, #6366f1, #a855f7, #ec4899, #f59e0b, #6366f1)",
            opacity: 0.5,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
