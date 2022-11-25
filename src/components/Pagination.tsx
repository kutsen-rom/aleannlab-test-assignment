import { Jobs } from "../App";
import { NavLink, useParams } from "react-router-dom";
import {
  makePagesToShow,
  countLeftSiblingPages,
  countRightSiblingPages
} from "./utilities";

// Quantity of jobs to show on one page
export const jobsPerPage = 6;

export default function Pagination({ jobs }: Jobs) {

  // React Router variable to get page number from URL
  const params = useParams();

  // Current page number from URL
  const currentPage = Number(params.page);

  // Total number of pages available to navigate through content
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

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
      className="container-pagination-navbar w-[95.5%] overflow-hidden bg-[#F9FAFD] mt-[1.65rem] mb-4 flex justify-between items- pt-2 shadow-[0px_1.5px_1px_rgb(170,170,170)] rounded-md
    lg:w-[60%] lg:justify-between lg:h-[3.25rem] lg:mt-[2.6rem] lg:mb-16 lg:shadow-[0px_1px_4px_rgb(170,170,170)] lg:bg-white lg:rounded-lg lg:items-center
    xl:w-[40%]
    2xl:w-[27%] 2xl:min-w-[30rem]"
    >

<div className="flex items-start h-2 lg:h-18">
  {/* NAVLINK: PREVIOUS PAGE */}
  <NavLink
        onClick={(e) => {
      // If current page is the first one, don't do anything
          currentPage === 1 && e.preventDefault();
        }}
        className="navlink-previous-page pointer-events-none items-center w-14 lg:w-[4.5rem] h-16 pl-6 mb-3 
        lg:pointer-events-auto lg:-mt-7
        hover:bg-[#EDEFF9] transition duration-75"
        to={`/${currentPage - 1}`}
      >

        {/* IMAGE: CHEVRON-LEFT */}
        <img
          className="image-chevron-left hidden lg:block w-4 h-4 mr-16 mt-5"
          src="/images/nav-chevron-left.svg"
          alt="chevron-left"
        />

        {/* SHAPE: LINE AFTER CHEVRON */}
        {/* <div className="shape-line-after-chevron absolute right-0 h-[1.875rem] border-r border-[#DEE3EF] mt-1"></div> */}
      </NavLink>

      <div className="shape-line-after-chevron right-0 h-[1.875rem] border-r border-[#DEE3EF] -mt-[0.15rem]
      lg:-mt-4"></div>

</div>
    

      {/* CONTAINER: NAVLINK PAGES */}
      <div className="container-navlink-pages w-[56%] flex justify-around items-start 
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
                  "navlin-to-page text-[#858B9D] font-bold px-4 sm:text-[17px] md:text-lg lg:text-[#70778B] lg:pt-5 lg:pb-2 lg:mb-2 xl:text-lg 2xl:text-[20.8px] hover:bg-[#EDEFF9] transition duration-75 active:bg-[#F9FAFD]",
                  isActive
                    ? "text-[#55699e] px-2 border-b-[3px] border-[#55699E] pb-[0.375rem] lg:pb-[0.29rem] lg:text-[#5876C5] lg:border-[#5876C5] pointer-events-none"
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

<div className="flex items-start h-2 lg:h-18 ">

   {/* SHAPE: LINE BEFORE CHEVRON */}
   <div className="shape-line-before-chevron right-0 h-[1.875rem] border-r border-[#DEE3EF] -mt-[0.15rem]
      lg:-mt-4"></div>

 {/* NAVLINK: NEXT PAGE */}
 <NavLink
      // If current page is the last one, don't do anything
        onClick={(e) => {
          currentPage === pagesToShow[pagesToShow.length - 1] && e.preventDefault();
        }}
        className="navlink-next-page pointer-events-none items-center w-14 lg:w-[4.5rem] h-16 pl-6 mb-3 lg:pointer-events-auto lg:-mt-7
        hover:bg-[#EDEFF9] transition duration-75"
        to={`/${currentPage + 1}`}
      >

        {/* IMAGE: CHEVRON-RIGHT */}
        <img
          className="image-chevron-right hidden lg:block w-4 h-4 mt-5 ml-2"
          src="/images/nav-chevron-right.svg"
          alt="chevron-right"
        />
        
      </NavLink>
      
</div>
     
    </nav>
  );
}
