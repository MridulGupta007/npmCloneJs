import DOMPurify from "dompurify";
import { calculateTime } from '../../Controller/CalculateTime'
const ActiveTab = ({ activeTab, packageDets }) => {
  const navigateToVersion = (version) => {
    navigate(`v/${version}`);
  };
  return (
    <div className="w-full px-3 sm:px-0 sm:w-8/12">
      {activeTab === "readme" ? (
        packageDets.readme ? (
          <div
            className="w-full overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(packageDets.readme),
            }}
          ></div>
        ) : (
          <div>
            {packageDets.description && packageDets.description}{" "}
            {"(no addtional readme given)"}
          </div>
        )
      ) : (
        <div className="w-full">
          <h1>Version History</h1>
          <div className="flex flex-col w-full">
            {Object.keys(packageDets.versions)
              .toReversed()
              .map((elem, index) => {
                return (
                  <div className="flex justify-between" key={index}>
                    <p
                      className="underline text-[#00000099] text-[16px] font-semibold cursor-pointer font-inconsolata"
                      onClick={() => navigateToVersion(elem)}
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
  );
};

export default ActiveTab;
