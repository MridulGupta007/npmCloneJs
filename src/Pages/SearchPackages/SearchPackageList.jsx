import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ContextHolder } from "../../Context/ContextHolder";
import SearchResultPackage from "./SearchResultPackage";
import Loader from "../../Components/Loader";

function SearchPackageList() {

  // simulate loading while fetching data
  const [loading, setLoading] = useState(false);

  // set url search params for sorting
  const [searchParams, setSearchParams] = useSearchParams();

  // keeps track of method based on which, package Array is sorted
  const [sortingMethod, setSortingMethod] = useState("");

  // Stores an array of incoming packages based on Search query
  const [packageArray, setPackageArray] = useState([]);

  // State for current page
  const [currentPage, setCurrentPage] = useState(1); 
  
  // Display 20 packages per page
  const itemsPerPage = 20; 

  // using context to track changes in query from App.jsx + Navbar.jsx
  const contextHolder = useContext(ContextHolder);

  // extract Query state
  const { changedQuery } = contextHolder;

  // API baseUrl
  const baseUrl = "https://registry.npmjs.org/-/v1/search";

  // fetching data from API endpoint
  const searchPackage = async (query) => {
    setLoading(true);
    try {
      const fetchPackages = await fetch(
        baseUrl + `?text=${query}` + `&size=250`
      );
      const response = await fetchPackages.json();

      // every time page reloads, check for sorting methods in URL params, if present, sort the data and store it
      searchParams.get("ranking")
        ? searchParams.get("ranking") !== "final"
          ? setPackageArray(
              response.objects.sort(
                (a, b) =>
                  b.score.detail[`${searchParams.get("ranking")}`] -
                  a.score.detail[`${searchParams.get("ranking")}`]
              )
            )
          : setPackageArray(
              response.objects.sort(
                (a, b) =>
                  b.score[`${searchParams.get("ranking")}`] -
                  a.score[`${searchParams.get("ranking")}`]
              )
            )
        : setPackageArray(response.objects);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // function to add sorting params to the URL
  const addParams = (sortingMethod) => {
    if (sortingMethod !== "") {
      let new_params = { q: searchParams.get("q"), ranking: sortingMethod };
      setSearchParams(new_params);
    }
  };


  // sorting function for first load and subsequent changes
  const new_sort = (sortingMethod) => {
    sortingMethod !== "final"
      ? setPackageArray((prev) =>
          [...prev].sort(
            (a, b) =>
              b.score.detail[`${sortingMethod}`] -
              a.score.detail[`${sortingMethod}`]
          )
        )
      : setPackageArray((prev) =>
          [...prev].sort(
            (a, b) => b.score[`${sortingMethod}`] - a.score[`${sortingMethod}`]
          )
        );
  };

  // Fetch data from API endpoint whenever search query changes
  useEffect(() => {
    searchPackage(searchParams.get("q"));
  }, [changedQuery]);

  // whenever user changes sorting method, re-arrange the data, and also update the URL params
  useEffect(() => {
    new_sort(sortingMethod);
    addParams(sortingMethod);
  }, [sortingMethod]);

  // Pagination Logic
  const indexOfLastPackage = currentPage * itemsPerPage;
  const indexOfFirstPackage = indexOfLastPackage - itemsPerPage;
  const currentPackages = packageArray.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const totalPages = Math.ceil(packageArray.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(1);

    // Show pages from 2 till (currentPage + 2) but only if they are less than totalPages
    for (let i = 2; i <= Math.min(currentPage + 2, totalPages - 1); i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if currentPage + 2 is less than totalPages - 1 (i.e., skip pages in between)
    if (currentPage + 2 < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="border font-source-sans-pro font-semibold text-[16px] sm:text-[20px] flex flex-col items-start sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-5 sm:py-7 bg-[#f9f9f9]">
            {packageArray.length} packages found
            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-start gap-y-1 sm:justify-center mt-4">
              {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={index}
                    onClick={() => goToPage(page)}
                    className={`font-source-sans-pro sm:text-[18px] border-2 border-[#cfcfcf] bg-white px-3 sm:px-4 py-1 sm:py-2 mx-1 rounded ${
                      page === currentPage
                        ? "text-black font-bold"
                        : "text-[#666666]"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="px-3 sm:px-4 py-1 sm:py-2 mx-1">
                    ...
                  </span>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row overflow-hidden">
            <div className="font-source-sans-pro font-semibold flex flex-col pl-8 pr-10 w-full sm:w-1/3 gap-y-2">
              <h1>Sort Packages</h1>
              <form className="text-[#000000b3] flex flex-col gap-y-2">
                {/* Sorting Method Radio Buttons */}
                <div className="py-1 flex gap-x-2">
                  <input
                    type="radio"
                    id="final"
                    name="sorting"
                    value="final"
                    onChange={(event) => setSortingMethod(event.target.value)}
                  />
                  <label
                    htmlFor="popularity"
                    className="hover:text-black border-b pb-1 border-[#bbb] w-full"
                  >
                    Optimal
                  </label>
                </div>

                <div className="py-1 flex gap-x-2">
                  <input
                    type="radio"
                    id="popularity"
                    name="sorting"
                    value="popularity"
                    onChange={(event) => setSortingMethod(event.target.value)}
                  />
                  <label
                    htmlFor="popularity"
                    className="hover:text-black border-b border-[#29abe2] w-full"
                  >
                    Popularity
                  </label>
                </div>

                <div className="py-1 flex gap-x-2">
                  <input
                    type="radio"
                    id="quality"
                    name="sorting"
                    value="quality"
                    onChange={(event) => setSortingMethod(event.target.value)}
                  />
                  <label
                    htmlFor="quality"
                    className="hover:text-black border-b border-[#8956ff] w-full"
                  >
                    Quality
                  </label>
                </div>

                <div className="py-1 flex gap-x-2">
                  <input
                    type="radio"
                    id="maintenance"
                    name="sorting"
                    value="maintenance"
                    onChange={(event) => setSortingMethod(event.target.value)}
                  />
                  <label
                    htmlFor="maintenance"
                    className="hover:text-black border-b border-[#cb3837] w-full"
                  >
                    Maintenance
                  </label>
                </div>
              </form>
            </div>

              {/* Package List rendered below */}
            <div>
              {currentPackages.length > 0 &&
                currentPackages.map((elem, index) => {
                  return <SearchResultPackage elem={elem} key={index} />;
                })}
                
              {/* Pagination Controls */}
              <div className="flex flex-wrap justify-start mx-3 sm:mx-0 gap-y-1 sm:justify-center my-4">
                {getPageNumbers().map((page, index) =>
                  typeof page === "number" ? (
                    <button
                      key={index}
                      onClick={() => goToPage(page)}
                      className={`font-source-sans-pro sm:text-[18px] border-2 border-[#cfcfcf] bg-white px-3 sm:px-4 py-1 sm:py-2 mx-1 rounded ${
                        page === currentPage
                          ? "text-black font-bold"
                          : "text-[#666666]"
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span
                      key={index}
                      className="sm:px-4 py-1 sm:py-2 mx-1"
                    >
                      ...
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SearchPackageList;
