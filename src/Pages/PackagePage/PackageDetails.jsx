import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import ActiveTab from "./ActiveTab";
import StatsSection from "./StatsSection";
import { calculateTime } from "../../Controller/CalculateTime";
function PackageDetails() {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [packageDets, setPackageDets] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("readme");
  const fetchPackageDetails = async (packageName) => {
    setDataLoaded(false);
    try {
      const information = await fetch(
        ` https://registry.npmjs.org/${packageName}`
      );
      const response = await information.json();

      setPackageDets(response);
    } catch (error) {
      console.log(error);
    }
    setDataLoaded(true);
  };

  const navigateToVersion = (version) => {
    navigate(`v/${version}`);
  };

  const addParams = (activeTab) => {
    if (activeTab !== "") {
      let new_params = { activeTab: activeTab };
      setSearchParams(new_params);
    }
  };

  useEffect(() => {
    fetchPackageDetails(packageName);
  }, []);

  useEffect(() => {
    addParams(activeTab);
  }, [activeTab]);

  return (
    <div className="sm:px-44 py-5 sm:py-16 antialiased">
      {dataLoaded ? (
        <div className="flex flex-col gap-y-2 sm:gap-y-4">
          <h1 className="font-source-sans-pro px-5 sm:px-0 font-semibold text-[24px]">
            {packageDets.name}
          </h1>
          <p className="font-fira-mono text-[14px] px-5 sm:px-0 leading-normal">
            <span
              className="cursor-pointer hover:underline"
              onClick={() =>
                packageDets["dist-tags"] &&
                navigateToVersion(packageDets["dist-tags"].latest)
              }
            >
              {packageDets["dist-tags"] && packageDets["dist-tags"].latest}
            </span>{" "}
            • <span className="text-[#14865c]">Public</span> • Published{" "}
            {packageDets["dist-tags"] &&
              packageDets.time &&
              calculateTime(
                packageDets.time[`${packageDets["dist-tags"].latest}`]
              )}
          </p>

          {/* active tabs */}
          <div className="flex flex-col sm:flex-row px-3 sm:px-0 gap-y-1 sm:items-center sm:mt-5 w-full">
            <button
              onClick={() => setActiveTab("readme")}
              className="flex-1 py-3 rounded-sm font-fira-mono text-[14px] font-medium px-16 bg-[#ffcd3a26] border-b-2 border-[#ffcd3a] text-[#ffcd3a]"
            >
              Readme
            </button>
            <button className="flex-1 py-3 rounded-sm px-16 font-fira-mono text-[14px] font-medium bg-[#cb383726] border-b-2 border-[#bc3433] text-[#bc3433]">
              Code
            </button>
            <button className="flex-1 py-3 rounded-sm px-16 font-fira-mono text-[14px] font-medium bg-[#c836c326] border-b-2 border-[#c836c3] text-[#00000080]">
              {packageDets.versions[`${packageDets["dist-tags"].latest}`]
                .dependencies
                ? Object.keys(
                    packageDets.versions[`${packageDets["dist-tags"].latest}`]
                      .dependencies
                  ).length
                : 0}{" "}
              Dependency
            </button>
            <button className="flex-1 py-3 rounded-sm px-16 font-fira-mono text-[14px] font-medium bg-[#8956ff21] border-b-2 border-[#8956ff] text-[#8956ff]">
              Dependents
            </button>
            <button
              onClick={() => setActiveTab("version")}
              className="flex-1 py-3 rounded-sm px-10 font-fira-mono text-[14px] font-medium border-b-2 border-[#29abe2] bg-[#29abe226] text-[#29abe2]"
            >
              {packageDets.versions && Object.keys(packageDets.versions).length}{" "}
              Versions
            </button>
          </div>

          {/* Detail Section starts here */}
          <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-x-6">
            {/* Active Tabs section will change based on the current tab */}
            <ActiveTab activeTab={activeTab} packageDets={packageDets} />

            {/* Stats section will remain static */}
            <StatsSection packageDets={packageDets} />
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default PackageDetails;




