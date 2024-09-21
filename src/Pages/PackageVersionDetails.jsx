import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Loader from "../Components/Loader";
import PersonIcon from "@mui/icons-material/Person";
import { calculateTime } from "../Controller/CalculateTime";

function PackageVersionDetails() {
  const { packageName, version } = useParams();
  const navigate = useNavigate();
  const [versions, setVersions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [packageDets, setPackageDets] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("readme");
  const fetchPackageDetails = async (packageName, version) => {
    setLoading(true);
    try {
      const information = await fetch(
        ` https://registry.npmjs.org/${packageName}/${version}`
      );
      const response = await information.json();
      console.log(response);
      setPackageDets(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  // const sanitizedHtml = DOMPurify.sanitize(packageDets.readme);
  const navigateToAnotherVersion = (version) => {
    navigate(`${version}`);
  };

  const addParams = (activeTab) => {
    if (activeTab !== "") {
      let new_params = { activeTab: activeTab };
      setSearchParams(new_params);
    }
  };

  useEffect(() => {
    fetchPackageDetails(packageName, version);
  }, []);

  useEffect(() => {
    const fetchPackage = async (packageName) => {
      try {
        const packageDetail = await fetch(
          `https://registry.npmjs.org/${packageName}`
        );
        const response = await packageDetail.json();

        const { versions } = response;

        setVersions(Object.keys(versions));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPackage(packageName);
  }, []);
  useEffect(() => {
    addParams(activeTab);
  }, [activeTab]);

  return (
    <div className="px-44 py-16 antialiased">
      {!loading ? (
        <div className="flex flex-col gap-y-4">
          <h1 className="font-source-sans-pro font-semibold text-[24px]">
            {packageDets.name}
          </h1>
          <p className="font-fira-mono text-[14px] leading-normal">
            <span className="cursor-pointer hover:underline">{version}</span> •{" "}
            <span className="text-[#14865c]">Public</span> • Published{" "}
            {packageDets["dist-tags"] &&
              packageDets.time &&
              calculateTime(packageDets.time[`${version}`])}
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
              {packageDets.dependencies
                ? Object.keys(packageDets.dependencies).length
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
              {versions.length} Versions
            </button>
          </div>

          {/* Detail Section starts here */}
          <div className="w-full flex justify-between gap-x-6">
            {/* Active Tabs section will change based on the current tab */}
            <div className="w-8/12">
              {activeTab === "readme" ? (
                packageDets.readme ? (
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(packageDets.readme),
                    }}
                  ></div>
                ) : (
                  <div>
                    {packageDets.description && packageDets.description}
                  </div>
                )
              ) : (
                <div className="w-full">
                  <h1>Version History</h1>
                  <div className="flex flex-col">
                    {Object.keys(versions)
                      .toReversed()
                      .map((elem, index) => {
                        return (
                          <div className="flex justify-between" key={index}>
                            <p
                              className="underline text-[#00000099] text-[16px] font-semibold cursor-pointer font-inconsolata"
                              onClick={() => navigateToAnotherVersion(elem)}
                            >
                              {elem}
                            </p>
                            <p className="text-[#00000099] text-[16px] font-inconsolata">
                              {calculateTime(packageDets.time[`${elem}`])}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Stats section will remain static */}
            <div className="w-4/12 px-3">
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
                  npm i {packageName}@{version}
                </div>
              </div>
              <div className="flex flex-col gap-y-1 py-5 border-b w-11/12 border-[#cccccc]">
                <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Repository
                </h1>
                <p className="font-source-sans-pro text-[18px] font-semibold">
                  {packageDets.repository
                    ? packageDets.repository.url.split("//")[1].split(".git")[0]
                    : "- Url not received"}
                </p>
              </div>
              <div className="flex flex-col gap-y-1 py-5 border-b w-11/12 border-[#cccccc]">
                <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                  Homepage
                </h1>
                <p className="font-source-sans-pro text-[18px] font-semibold">
                  {packageDets.homepage
                    ? packageDets.homepage.split("//")[1].split("/")[0]
                    : "- Url not received"}
                </p>
              </div>
              <div className="flex justify-between py-5 border-b w-11/12 border-[#cccccc]">
                {packageDets.version && (
                  <div className="flex-1 flex flex-col gap-y-1">
                    <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
                      Version
                    </h1>
                    <p className="font-source-sans-pro text-[18px] font-semibold">
                      {version}
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

export default PackageVersionDetails;
