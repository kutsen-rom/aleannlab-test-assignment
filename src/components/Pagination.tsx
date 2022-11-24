import { Jobs } from "../App";
import { NavLink, useParams } from "react-router-dom";
import { makePagesToShow, countLeftSiblingPages, countRightSiblingPages } from "./utilities";

export default function Pagination({ jobs }: Jobs) {
  // React Router variable to get page number from URL
  const params = useParams();

  // Current page number from URL
  const currentPage = Number(params.page);

  // Quantity of jobs to show on one page
  const jobsPerPage = 2;

  // Total number of pages available to navigate through content
  const totalPages = jobs.length / jobsPerPage;

  // Maximum quantity of pages on one side to the left of the currentPage and to the right of it
  const siblingPages = 4;

  // Array with values of pages to the left side of currentPage OR an empty array if there're no elements to the left side of currentPage (currentPage is the first page)
  const leftSiblingPages = countLeftSiblingPages(currentPage, siblingPages, totalPages) || [];

  // Array with values of pages to the right side of currentPage OR an empty array if there're no elements to the right side of currentPage (currentPage is the last page)
  const rightSiblingPages = countRightSiblingPages(currentPage, siblingPages, totalPages) || [];

  // Array of all pages to show for navigation
  const pagesToShow = makePagesToShow(leftSiblingPages, currentPage, rightSiblingPages, totalPages);

  console.log(leftSiblingPages)


  return (
    <nav>
      <NavLink to={`/${currentPage - 1}`}>←</NavLink>
      {pagesToShow.map((page) => {
        return <NavLink to={page === '...' ? `/${currentPage - 1}` : `/${page}`}>{page}</NavLink>;
      })}
      <NavLink to={`/${currentPage + 1}`}>→</NavLink>
    </nav>
  );
}
