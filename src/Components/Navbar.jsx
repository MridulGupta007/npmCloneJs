import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { ContextHolder } from "../Context/ContextHolder";
import { useNavigate, useSearchParams } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const contextHolder = useContext(ContextHolder);

  // input is used to change params, setInput is used to change input value on every change, setChangedQuery keeps track of search term
  const { input, setInput, setChangedQuery } = contextHolder;
  
  // function to add or update query param in URL
  const addParams = (query) => {
    if (query != "") {
      let params = { q: query };
      setSearchParams(params);
    }
  };
  return (
    <div className="bg-[#ffffff] mt-1 shadow-md">
      <div className="flex justify-start gap-x-5 sm:gap-x-6 border-b py-3 sm:py-5 px-5 sm:px-10 text-[0.75rem] sm:text-[0.875rem] font-medium leading-6">
       <span className="hidden sm:inline">❤</span>
        <p>Pro</p>
        <p>Teams</p>
        <p>Pricing</p>
        <p>Documentation</p>
      </div>
      <div className="flex justify-between sm:justify-normal gap-x-3 sm:gap-x-6 border-b py-3 sm:py-5 px-4 sm:px-10">
        <svg viewBox="0 0 780 250" aria-hidden="true" width="70px" className="cursor-pointer" onClick={() => navigate('/')}>
          <path
            fill="#231f20"
            d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
          ></path>
        </svg>
        <div className="hidden sm:flex sm:w-9/12 sm:relative">
          <input
            type="text"
            className="bg-[#f2f2f2] w-11/12 py-4 pl-12 outline-[1px] font-light text-[16px] leading-tight placeholder:tracking-[-0.02em] placeholder:text-[#777777] placeholder:text-[15px] tracking-tighter font-fira-mono"
            placeholder="Search Packages"
            onChange={(event) => setInput(event.target.value)}
          />
          <SearchIcon color="disabled" className="absolute top-[27%] left-3" />
          <button
            className="bg-black text-white px-7 font-medium text-[0.875rem] leading-6"
            onClick={() => {
                navigate('/search')
                addParams(input)
                setChangedQuery(input)
            }}
          >
            Search
          </button>
        </div>
        <div className="flex gap-x-2">
        <button className="border px-5 sm:px-7 py-3 font-medium text-[0.75rem] sm:text-[0.875rem] leading-6">
          Sign Up
        </button>
        <button className="font-medium px-5 sm:px-7 py-3 text-[0.75rem] sm:text-[0.875rem] leading-6">
          Sign In
        </button>
        </div>
      </div>
      <div className="flex justify-center py-3 px-3 sm:hidden w-full relative">
          <input
            type="text"
            className="bg-[#f2f2f2] w-8/12 py-3 pl-8 outline-[1px] font-light text-[12px] leading-tight placeholder:tracking-[-0.02em] placeholder:text-[#777777] placeholder:text-[12px] tracking-tighter font-fira-mono"
            placeholder="Search Packages"
            onChange={(event) => setInput(event.target.value)}
          />
          <SearchIcon color="disabled" className="absolute top-[31%] left-8" />
          <button
            className="bg-black text-white px-5 font-medium text-[0.75rem] leading-6"
            onClick={() => {
                navigate('/search')
                addParams(input)
                setChangedQuery(input)
            }}
          >
            Search
          </button>
        </div>
    </div>
  );
}

export default Navbar;
