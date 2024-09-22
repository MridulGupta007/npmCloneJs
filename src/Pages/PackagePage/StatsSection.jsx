import PersonIcon from "@mui/icons-material/Person";

const StatsSection = ({ packageDets }) => {
  return (
    
    <div className="w-full px-3 sm:w-4/12">
      <div className="flex flex-col gap-y-3 py-5">
        <span className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
          Install
        </span>
        <div className="border flex border-[#cccccc] w-full sm:w-11/12 px-3 py-3 font-fira-mono text-[14px] rounded-md">
          <svg viewBox="0 0 12.32 9.33" aria-hidden="true" className="w-3">
            <g>
              <line className="st1" x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line>
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
      <div className="flex flex-col gap-y-1 py-5 border-b w-full sm:w-11/12 border-[#cccccc]">
        <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
          Repository
        </h1>
        <p className="font-source-sans-pro text-[18px] font-semibold">
          {packageDets.repository
            ? packageDets.repository.url.split("//")[1].split(".git")[0]
            : "- Url not received"}
        </p>
      </div>
      <div className="flex flex-col gap-y-1 py-5 border-b w-full sm:w-11/12 border-[#cccccc]">
        <h1 className="text-[16px] font-source-sans-pro font-bold text-[#757575]">
          Homepage
        </h1>
        <p className="font-source-sans-pro text-[18px] font-semibold">
          {packageDets.homepage
            ? packageDets.homepage.split("//")[1].split("/")[0]
            : "- Url not received"}
        </p>
      </div>
      <div className="flex justify-between py-5 border-b w-full sm:w-11/12 border-[#cccccc]">
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
      <div className="flex flex-col gap-y-1 py-5 w-full sm:w-11/12">
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
  );
};

export default StatsSection;
