import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { ContextHolder } from "../Context/ContextHolder";
import { useNavigate, useSearchParams } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const contextHolder = useContext(ContextHolder);
  const { input, setInput, setChangedQuery } = contextHolder;
  const addParams = (query) => {
    if (query != "") {
      let params = { q: query };
      setSearchParams(params);
    }
  };
  return (
    <div className="bg-[#ffffff] mt-1 shadow-md">
      <div className="flex gap-x-6 border-b py-5 px-10 text-[0.875rem] font-medium leading-6">
        <FavoriteIcon
          sx={{
            color: "primary",
            "&:hover": {
              color: "disabled",
            },
          }}
          className="hidden sm:flex"
        />
        <p>Pro</p>
        <p>Teams</p>
        <p>Pricing</p>
        <p>Documentation</p>
      </div>
      <div className="flex gap-x-6 border-b py-5 px-10">
        <svg viewBox="0 0 780 250" aria-hidden="true" width="70px" className="cursor-pointer" onClick={() => navigate('/')}>
          <path
            fill="#231f20"
            d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
          ></path>
        </svg>
        <div className="flex w-9/12 relative">
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

        <button className="border px-7 font-medium text-[0.875rem] leading-6">
          Sign Up
        </button>
        <button className="font-medium text-[0.875rem] leading-6">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Navbar;
