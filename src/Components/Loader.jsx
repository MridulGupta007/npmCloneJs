
import React from "react";
import { FaSpinner } from "react-icons/fa"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <FaSpinner className="text-white text-6xl animate-spin" />
    </div>
  );
};

export default Loader;
