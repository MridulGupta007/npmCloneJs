import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Loader from "../Components/Loader";
import PersonIcon from "@mui/icons-material/Person";
function PackageDetails() {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const [packageDets, setPackageDets] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("readme");
  const fetchPackageDetails = async (packageName) => {
    setDataLoaded(false);
    try {
      console.log(` https://registry.npmjs.org/${packageName}`);
      const information = await fetch(
        ` https://registry.npmjs.org/${packageName}`
      );
      const response = await information.json();
      console.log(response);
      setPackageDets(response);
    } catch (error) {
      console.log(error);
    }
    setDataLoaded(true);
  };
  const sanitizedHtml = DOMPurify.sanitize(packageDets.readme);
  const calculateTime = (date) => {
    let todayDate = new Date();
    let packageDate = new Date(date);

    let differenceInDays = Math.floor(
      (todayDate.getTime() - packageDate.getTime()) / (1000 * 24 * 60 * 60)
    );
    if (differenceInDays > 365) {
      return `${
        Math.floor(differenceInDays / 365) > 1
          ? `${Math.floor(differenceInDays / 365)} years ago`
          : "a year ago"
      }`;
    } else if (differenceInDays > 30) {
      return `${
        Math.floor(differenceInDays / 30) > 1
          ? `${Math.floor(differenceInDays / 30)} months`
          : "a month ago"
      }`;
    } else {
      return differenceInDays > 1
        ? `${differenceInDays} days ago`
        : differenceInDays === 1
        ? "a day ago"
        : `${Math.floor(
            (todayDate.getTime() - packageDate.getTime()) / (1000 * 60 * 60)
          )} hours ago`;
    }
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
    addParams(activeTab)
  }, [activeTab])

  return (
    <div className="px-44 py-16 antialiased">
      {dataLoaded ? (
        <div>
          <h1 className="font-source-sans-pro font-semibold text-[24px]">
            {packageDets.name}
          </h1>
          <p className="font-fira-mono text-[14px] leading-normal">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => packageDets["dist-tags"] && navigateToVersion(packageDets["dist-tags"].latest)}
            >
              {packageDets["dist-tags"].latest}
            </span>{" "}
            • <span className="text-[#14865c]">Public</span> • Published{" "}
            {packageDets["dist-tags"] && packageDets.time && calculateTime(
              packageDets.time[`${packageDets["dist-tags"].latest}`]
            )}
          </p>

          {/* active tabs */}
          <div className="flex items-center mt-5 w-full">
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
              Dependencies
            </button>
            <button className="flex-1 py-3 rounded-sm px-16 font-fira-mono text-[14px] font-medium bg-[#8956ff21] border-b-2 border-[#8956ff] text-[#8956ff]">
              Dependents
            </button>
            <button
              onClick={() => setActiveTab("version")}
              className="flex-1 py-3 rounded-sm px-16 font-fira-mono text-[14px] font-medium border-b-2 border-[#29abe2] bg-[#29abe226] text-[#29abe2]"
            >
              {Object.keys(packageDets.versions).length} Versions
            </button>
          </div>
          <div className="w-full flex">
            <div className="w-8/12">
              {/* Active Tabs section will change based on the current tab */}
              {activeTab === "readme" ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
              ) : (
                <div>

                </div>
              )}
            </div>
            <div className="w-4/12 px-3">
              {/* Stats section will remain static */}
              <div className="flex flex-col gap-y-3 py-5">
                <span className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Install
                </span>
                <div className="border flex border-[#cccccc] w-11/12 px-3 py-3 font-fira-mono text-[14px] rounded-md">
                  <svg
                    viewBox="0 0 12.32 9.33"
                    aria-hidden="true"
                    className="w-3"
                  >
                    <g>
                      <line
                        class="st1"
                        x1="7.6"
                        y1="8.9"
                        x2="7.6"
                        y2="6.9"
                      ></line>
                      <rect width="1.9" height="1.9"></rect>
                      <rect x="1.9" y="1.9" width="1.9" height="1.9"></rect>
                      <rect x="3.7" y="3.7" width="1.9" height="1.9"></rect>
                      <rect x="1.9" y="5.6" width="1.9" height="1.9"></rect>
                      <rect y="7.5" width="1.9" height="1.9"></rect>
                    </g>
                  </svg>
                  npm i {packageDets.name}
                </div>
              </div>
              <div className="flex flex-col gap-y-1 py-5 border-b w-11/12 border-[#cccccc]">
                <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Repository
                </h1>
                <p className="font-source-sans-pro text-[18px] font-semibold">
                  {packageDets.repository ? packageDets.repository.url.split("//")[1].split(".git")[0] : '- Url not received'}
                </p>
              </div>
              <div className="flex flex-col gap-y-1 py-5 border-b w-11/12 border-[#cccccc]">
                <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Homepage
                </h1>
                <p className="font-source-sans-pro text-[18px] font-semibold">
                  {packageDets.homepage ? packageDets.homepage.split("//")[1].split("/")[0] : '- Url not received'}
                </p>
              </div>
              <div className="flex justify-between py-5 border-b w-11/12 border-[#cccccc]">
                {packageDets["dist-tags"] && (
                  <div className="flex-1 flex flex-col gap-y-1">
                    <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                      Version
                    </h1>
                    <p className="font-source-sans-pro text-[18px] font-semibold">
                      {packageDets["dist-tags"].latest}
                    </p>
                  </div>
                )}
                {packageDets.license && (
                  <div className="flex-1 flex flex-col gap-y-1">
                    <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                      License
                    </h1>
                    <p className="font-source-sans-pro text-[18px] font-semibold">
                      {packageDets.license}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-y-1 py-5 border-b w-11/12 border-[#cccccc]">
                <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Users
                </h1>
                <p className="font-source-sans-pro text-[18px] font-semibold">
                  {packageDets.users
                    ? Object.entries(packageDets.users).length
                    : 0}
                </p>
              </div>
              <div className="flex flex-col gap-y-1 py-5 border-b w-11/12 border-[#cccccc]">
                <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Collaborators
                </h1>
                <div className="flex gap-x-2 flex-wrap">
                  {packageDets.maintainers &&
                    packageDets.maintainers.length > 0 &&
                    packageDets.maintainers.map((elem, index) => {
                      return <PersonIcon key={index} titleAccess={elem.name} />;
                    })}
                </div>
              </div>
            </div>
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
