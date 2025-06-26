import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="relative mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full py-3 pl-4 pr-12 rounded-lg border text-white border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-secondary dark:bg-gray-800 dark:text-secondary transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary hover:text-accent dark:hover:text-accent transition-colors duration-200"
        >
          <FaSearch className="text-lg" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
