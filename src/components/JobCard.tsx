import { Job } from "../App";
import { useState, useEffect } from "react";

// Type of props
interface IProps {
    job: Job;
}

// Key for Google Static Map API
export const mapApiKey = process.env.REACT_APP_MAP_API_KEY;


/**
   * Fetch address with Google Geocode API, with latitude and longitude,
   * set address state to formatted_address
   * @param setAddress function to set address state
   * @param job object to get latitude and longitude
   * @returns json with address in different formats
   */
 export async function getAddress(setAddress: React.Dispatch<React.SetStateAction<string[]>>, job: Job) {
    try {
      // Fetch address with latitude, longtitude and API Key
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${job.location.lat},${job.location.long}&key=${mapApiKey}`
      );
      const json = await result.json();
      // Set address state to formatted_address
      setAddress(json.results[0].formatted_address.split(','));
      return json;
    } catch (e) {
      console.error(e);
    }
  }


/**
 * Calculate difference in years (since API returns jobs posted years ago), between current year and year when job was posted
 * @param created - year when job was created
 * @returns number of difference in years
 */
export function calculateDate (created: string) {
  // Year when job was created
  const dateCreatedAt = new Date(created).getFullYear();
  // Current year
  const dateNow = new Date().getFullYear();
  // Difference in years (number)
  return dateNow - dateCreatedAt;
};


export default function JobCard({ job }: IProps) {

    /**
     *  State of the address fetched from Google Geocode API
     */
    const [address, setAddress] = useState(['']);
 
    
  // Since rating is not provided in fetched data I'll just randomly get number of stars
  const rating = Math.ceil(Math.random() * 5);

//   When component mounts call getAddress function once to setAddress of job object's latitude and longitude 
  useEffect(() => {
    getAddress(setAddress, job);
  }, []);


  return (

    // MAIN CONTAINER: JOB CARD
    <div className="w-full bg-background-job mt-2  shadow-[0px_1.5px_1px_rgb(170,170,170)] rounded-lg">

      {/* CONTAINER: IMAGE & INFO */}
      <div className="flex justify-around">
        
        {/* IMAGE */}
        <img
          alt="location"
          src={job.pictures[0]}
          className="ml-1 mt-[11.5%] w-[65px] h-[65px] object-cover object-center rounded-full"
        />

        {/* CONTAINER: INFO */}
        <div className="w-[72.5%]">

          {/* CONTAINER: RATING & POSTED */}
          <div className="flex w-full mt-3 mb-3 justify-between items-center">

            {/* CONTAINER: RATING */}
            <div className="flex items-center">

              {/* RATING'S STARS */}
              {/* Create an array with @rating number of elements and than fill it with any value (in this case number 1)
  and then iterate through it to render needed amount of stars*/}
              {Array(rating).fill(1).map((el, index) => (
                
                  // IMAGE: STAR
                  <img
                    key={index}
                    alt="star"
                    className="mx-[0.5px] w-[10px] h-[10px]"
                    src="/images/star.svg"
                  />
                ))}
            </div>

            {/* LINE: POSTED */}
            <p className="mr-[2%] text-right text-muted font-light text-sm tracking-[0.206667px]">
            Posted {calculateDate(job.createdAt)} years ago
            </p>
          </div>

          {/* JOB TITLE */}
          <h2 className="text-brand text-lg h-12 overflow-hidden leading-[24px] tracking-tighter">
            {job.title}
          </h2>

          {/* DEPARTMENT NAME */}
          <h3 className="text-muted tracking-[0.23619px] mt-1">
            Department name • {job.name}
          </h3>

          {/* CONTAINER: ADDRESS */}
          <div className="flex items-center my-2 pb-[19px] ">

            {/* IMAGE: GEO MARKER */}
            <img alt="geo" className="h-5" src="/images/geo.svg" />

            {/* ADDRESS */}
            <p className="text-muted ml-2 tracking-[0.23619px]">

            {/* CITY */}
            {/* If length of address array is more than 1, then reverse order of array elements and render second element which stands for city, else (e.g. if coordinates are random place in the ocean) render the only element from array (coordinates) */}
            {address.length > 1 && `${address.reverse()[1].replace(/[0-9]/g, '')},`}
            {/* COUNTRY */}
            {address[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
