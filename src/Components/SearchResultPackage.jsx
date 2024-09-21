import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTime } from "../Controller/CalculateTime";

function SearchResultPackage({ elem }) {
  const navigate = useNavigate();
  const navigateToPackage = (name) => {
    navigate(`/package/${name}`);
  };

  return (
    <div className="border-b px-3 sm:px-0 w-full font-source-sans-pro flex flex-col sm:flex-row items-center sm:justify-between py-3 sm:py-4 sm:pr-5 sm:mr-5">
      <div className="flex flex-col w-full gap-y-4">
        <p
          className="hover:underline cursor-pointer leading-4 text-[16px] sm:text-[20px] font-semibold"
          onClick={() => navigateToPackage(elem.package.name)}
        >
          {elem.package.name}
        </p>
        <p className="text-[14px] sm:text-[16px] text-[#00000099]">
          {elem.package.description}
        </p>
        <div className="flex flex-wrap w-3/4 sm:w-full gap-2">
          {elem.package.keywords &&
            elem.package.keywords.length > 0 &&
            elem.package.keywords.map((elem, index) => {
              return (
                <div
                  key={index}
                  className={
                    "bg-[#0000000d] text-[#000000d9] px-2 text-[14px] rounded-md " +
                    `${index > 10 ? "hidden" : ""}`
                  }
                >
                  {elem}
                </div>
              );
            })}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-1">
          <p className="text-[#000000b3] font-bold leading-7 text-[16px]">
            {elem.package.publisher.username}
          </p>
          <div className="flex items-center gap-x-1">
          <p>published {elem.package.version} •</p>
          <p>{calculateTime(elem.package.date)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end text-[13px] sm:text-[16px] w-full py-2 sm:py-0">
        <p>p {elem.score.detail.popularity}</p>
        <p>q {elem.score.detail.quality}</p>
        <p>m {elem.score.detail.maintenance}</p>
      </div>
    </div>
  );
}

export default SearchResultPackage;
