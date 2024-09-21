import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTime } from "../Controller/CalculateTime";

function SearchResultPackage({ elem }) {
  const navigate = useNavigate();
  const navigateToPackage = (name) => {
    navigate(`/package/${name}`);
  };

  return (
    <div className="border-b font-source-sans-pro flex items-center justify-between py-4 pr-5 mr-5">
      <div className="flex flex-col gap-y-4">
        <p
          className="hover:underline cursor-pointer leading-4 text-[20px] font-semibold"
          onClick={() => navigateToPackage(elem.package.name)}
        >
          {elem.package.name}
        </p>
        <p className="text-[16px] text-[#00000099]">
          {elem.package.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {elem.package.keywords &&
            elem.package.keywords.length > 0 &&
            elem.package.keywords.map((elem, index) => {
              return (
                <div
                  key={index}
                  className={
                    "bg-[#0000000d] text-[#000000d9] px-2 rounded-md " +
                    `${index > 10 ? "hidden" : ""}`
                  }
                >
                  {elem}
                </div>
              );
            })}
        </div>
        <div className="flex items-center gap-x-1">
          <p className="text-[#000000b3] font-bold leading-7 text-[16px]">
            {elem.package.publisher.username}
          </p>
          <p>published {elem.package.version} •</p>
          <p>{calculateTime(elem.package.date)}</p>
        </div>
      </div>
      <div>
        <p>p {elem.score.detail.popularity}</p>
        <p>q {elem.score.detail.quality}</p>
        <p>m {elem.score.detail.maintenance}</p>
      </div>
    </div>
  );
}

export default SearchResultPackage;
