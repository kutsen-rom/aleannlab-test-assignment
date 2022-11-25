import { Jobs } from "../App";
import { NavLink, useParams } from "react-router-dom";
import {
  makePagesToShow,
  countLeftSiblingPages,
  countRightSiblingPages,
  jobsPerPage
} from "./utilities";

export default function Pagination({ jobs }: Jobs) {

  // React Router variable to get page number from URL
  const params = useParams();

  // Current page number from URL
  const currentPage = Number(params.page);

  // Total number of pages available to navigate through content
  const totalPages = jobs.length / jobsPerPage;

  // Maximum quantity of pages on one side to the left of the currentPage and to the right of it
  const siblingPages = 3;

  // Array with values of pages to the left side of currentPage OR an empty array if there're no elements to the left side of currentPage (currentPage is the first page)
  const leftSiblingPages =
    countLeftSiblingPages(currentPage, siblingPages, totalPages) || [];

  // Array with values of pages to the right side of currentPage OR an empty array if there're no elements to the right side of currentPage (currentPage is the last page)
  const rightSiblingPages =
    countRightSiblingPages(currentPage, siblingPages, totalPages) || [];

  // Array of all pages to show for navigation
  const pagesToShow = makePagesToShow(
    leftSiblingPages,
    currentPage,
    rightSiblingPages,
    totalPages
  );

  return (

    // CONTAINER: PAGINATION NAVBAR
    <nav
      className="w-[95.5%] overflow-hidden bg-[#F9FAFD] mt-[1.65rem] mb-4 flex justify-center items- pt-2 shadow-[0px_1.5px_1px_rgb(170,170,170)] rounded-md
    lg:w-[60%] lg:justify-between lg:h-[3.25rem] lg:mt-[2.6rem] lg:mb-16 lg:shadow-[0px_1px_4px_rgb(170,170,170)] lg:bg-white lg:rounded-lg lg:items-center
    xl:w-[40%]
    2xl:w-[27%] 2xl:min-w-[30rem]"
    >

      {/* NAVLINK: PREVIOUS PAGE */}
      <NavLink
        onClick={(e) => {
      // If current page is the first one, don't do anything
          currentPage === 1 && e.preventDefault();
        }}
        className="hidden lg:flex relative items-center w-[4.5rem] h-16 pl-6 mb-3 
        hover:bg-[#EDEFF9] transition duration-75"
        to={`/${currentPage - 1}`}
      >

        {/* IMAGE: CHEVRON-LEFT */}
        <img
          className="w-4 h-4 mr-16 mt-1"
          src="/images/nav-chevron-left.svg"
        />

        {/* SHAPE: LINE AFTER CHEVRON */}
        <div className="absolute right-0 h-[1.875rem] border-r border-gray-300 mt-1"></div>
      </NavLink>

      {/* CONTAINER: NAVLINK PAGES */}
      <div className="w-[56%] flex justify-around items-start 
      lg:mb-1">

        {/* For every page element in pagesToShow array... */}
        {pagesToShow.map((page, index) => {
          // render a NavLink...
          return (
            <NavLink
              // if page element is first three dots...
              to={
                page === "..." && index === 1
                  // NavLink to page before first sibling page...
                  ? `/${currentPage - (siblingPages + 1)}`
                  // if page element is last three dots...
                  : page === "..." && index === pagesToShow.length - 2
                  // NavLink to page after last sibling page...
                  ? `/${currentPage + 4}`
                  // if page element is number, NavLink to page with that number
                  : `/${page}`
              }
              className={({ isActive }) =>
                [
                  "text-[#858B9D] font-bold px-2 sm:text-[17px] md:text-lg lg:pt-5 lg:pb-2 lg:mb-2 xl:text-lg 2xl:text-[20.8px] hover:bg-gray-100 transition duration-75",
                  isActive
                    ? "text-[#55699e] border-b-[3px] border-[#55699E] pb-[0.375rem] lg:pb-[0.29rem] lg:text-[#5876C5] lg:border-[#5876C5]"
                    : null,
                ]
                // lines to make TailwindCSS work with isActive
                  .filter(Boolean)
                  .join(" ")
              }
            >
              {page}
            </NavLink>
          );
        })}
      </div>

      {/* NAVLINK: NEXT PAGE */}
      <NavLink
      // If current page is the last one, don't do anything
        onClick={(e) => {
          currentPage === pagesToShow[pagesToShow.length - 1] && e.preventDefault();
        }}
        className="hidden lg:flex relative items-center w-[4.5rem] h-16 pl-6 mb-3 
        hover:bg-[#EDEFF9] transition duration-75"
        to={`/${currentPage + 1}`}
      >

        {/* SHAPE: LINE BEFORE CHEVRON */}
        <div className="absolute left-0 h-[1.875rem] border-r border-gray-300 mt-1"></div>

        {/* IMAGE: CHEVRON-LEFT */}
        <img
          className="w-4 h-4 ml-3 mt-1"
          src="/images/nav-chevron-right.svg"
        />
        
      </NavLink>
    </nav>
  );
}
