import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ContextHolder } from "./Context/ContextHolder";
import Navbar from "./Components/Navbar";

import Footer from "./Components/Footer";
import HomeLayout from "./Pages/HomeLayout";
function App() {
  const [input, setInput] = useState("");

  const [changedQuery, setChangedQuery] = useState("");

  return (
    <ContextHolder.Provider
      value={{ changedQuery, input, setInput, setChangedQuery }}
    >
      <div className="font-poppins antialiased">
        <div className="h-[12px] bg-gradient-to-br from-[#fb8817] via-[#e63a11] to-[#e02aff]"></div>
        <Navbar />
        <Outlet />
        <Footer />
        <div className="h-[12px] bg-gradient-to-br from-[#fb8817] via-[#e63a11] to-[#e02aff]"></div>
      </div>
      {/* <HomeLayout /> */}
    </ContextHolder.Provider>
  );
}

export default App;
