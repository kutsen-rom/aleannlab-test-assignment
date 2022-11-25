import { Job } from "../App";

// Key for Google Static Map API
export const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

/**
 * Fetch address with Google Geocode API, with latitude and longitude,
 * set address state to formatted_address
 * @param setAddress function to set address state
 * @param job object to get latitude and longitude
 * @returns json with address in different formats
 */
export async function getAddress(
  setAddress: React.Dispatch<React.SetStateAction<string[]>>,
  job: Job
) {
  try {
    // Fetch address with latitude, longtitude and API Key
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${job.location.lat},${job.location.long}&key=${mapApiKey}`
    );
    const json = await result.json();
    // Set address state to formatted_address
    setAddress(json.results[0].formatted_address.split(","));
    return json;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Calculate difference in years (since API returns only jobs posted years ago), between current year and a year when job was posted
 * @param created - year when job was created
 * @returns difference in number of years
 */
export function calculateDate(created: string) {
  // Year when job was created
  const dateCreatedAt = new Date(created).getFullYear();
  // Current year
  const dateNow = new Date().getFullYear();
  // Difference in years (number)
  return dateNow - dateCreatedAt;
}

/**
 * Checks how many pages in range of siblingPages (from 0 to siblingPages value) are between currentPage and the first page,
 * then creates an array with appropriate number of values,
 * maps over it and returns an array with values in ascending order with the highest being currentPage - 1
 * @returns an array with siblingPages or less number of values in ascending order with the highest value being currentPage - 1
 */
export function countLeftSiblingPages(
  currentPage: number,
  siblingPages: number,
  totalPages: number
) {
  // Loop to check how many pages are between currentPage and the first page in range of siblingPages (from 0 to siblingPages value)
  for (let i = 0; i < siblingPages; i++) {
    // if there are more than 0 elements between currentPage and first item in this range...
    if (currentPage - (siblingPages - i) > 0) {
      // return an array with siblingPages - i number of elements...
      return (
        Array(siblingPages - i)
          // fill all elements in array with random value (number 1 in this case)...
          .fill(1)
          // then map through this array...
          .map((_, index) => {
            // and return an array with appropriate values in ascending order
            return currentPage - (Array(siblingPages - i).length - index);
          })
      );
    }
  }
}

/**
 * Checks how many pages in range of siblingPages (from 0 to siblingPages value) are between currentPage and the last page,
 * then creates an array with appropriate number of values,
 * maps over it and returns an array with values in ascending order with the lowest being currentPage + 1
 * @returns an array with siblingPages or less number of values in ascending order with the lowest value being currentPage + 1
 */
export function countRightSiblingPages(
  currentPage: number,
  siblingPages: number,
  totalPages: number
) {
  // Loop to check how many pages are between currentPage and the last page in range of siblingPages (from 0 to siblingPages value)
  for (let i = 0; i < siblingPages; i++) {
    // if there are more than 0 elements between currentPage and last item in this range...
    if (currentPage + (siblingPages - i) <= totalPages) {
      // return an array with siblingPages - i number of elements...
      return (
        Array(siblingPages - i)
          // fill all elements in array with random value (number 1 in this case)...
          .fill(1)
          // then map through this array...
          .map((_, index) => {
            // and return an array with appropriate values in ascending order
            return currentPage + (index + 1);
          })
      );
    }
  }
}

/**
 * Makes array of pages concating leftSiblingPages, currentPage and righSiblingPages, inserting first and last page if needed, and inserting dots (...) between pages if gap between first/last page and first leftSiblingPage/last rightSiblingPage is more than 1
 * @param leftSiblingPages array of numbers of left side pages of the currentPage
 * @param currentPage number of currentPage
 * @param rightSiblingPages array of numbers of right side pages of the currentPage
 * @param totalPages number of all pages
 * @returns array with first, last page, dots between pages if gap between first/last page and first leftSiblingPage/last rightSiblingPage is more than 1 and concated array of leftSiblingPages, currentPage and rightSiblingPages
 */
export function makePagesToShow(
  leftSiblingPages: number[],
  currentPage: number,
  rightSiblingPages: number[],
  totalPages: number
) {

  // Concat leftSiblingPages, currentPage and rightSiblingPages into single array
  const pages: (number | string)[] = leftSiblingPages.concat(
    currentPage,
    rightSiblingPages
  );

  // Last element in pages array
  const last = pages.length - 1;

  // If first element in pages array is number 2...
  if (pages[0] === 2) {
    // paste number 1 at front of an array...
    pages.unshift(1);
    // if first element in pages array is number more than 1...
  } else if (pages[0] > 1) {
    // paste 2 elements: number 1 and dots string "..." at front of an array
    pages.unshift(1, "...");
  }

  // If last element in pages array is a number before totalPages number...
  if (pages[last] === totalPages - 1) {
    // push totalPages number as the last element of an array...
    pages.push(totalPages);
    // if last element in pages array is number less than totalPages - 1... 
  } else if (pages[last] < totalPages - 2) {
    // push dots string "..." and totalPages number to the end of an array...
    pages.push("...", totalPages);
  }
  // and return pages array with: first page and dots (optional), concated array of leftSiblingPages, currentPage and rightSiblingPages, dots (optional) and last page 
  return pages;
}
