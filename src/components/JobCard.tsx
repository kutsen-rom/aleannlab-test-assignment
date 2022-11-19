import { Job } from "../App";
import { useState, useEffect } from "react";
import { getAddress, calculateDate } from "./utilities";
import { Link } from "react-router-dom";

// Type of props
interface IProps {
    job: Job;
}



export default function JobCard({ job }: IProps) {

    /**
     *  State of the address fetched from Google Geocode API
     */
    const [address, setAddress] = useState(['']);
 
    
  // Since rating is not provided in fetched data I'll just randomly get number of stars
  const rating = Math.ceil(Math.random() * 5);

//   When component mounts call getAddress function once to setAddress state to fetched address by job's latitude and longtitude  
  useEffect(() => {
    getAddress(setAddress, job);
  }, []);


  return (

    // MAIN CONTAINER: JOB CARD
    <div className="main-container-job-card w-full bg-background-job mt-2 shadow-[0px_1.5px_1px_rgb(170,170,170)] rounded-lg lg:bg-white lg:shadow-[1px_1.5px_4px_rgb(200,200,200)] lg:mt-0 lg:hover:shadow-[1px_1.5px_6px_rgb(100,100,100)]">

      {/* CONTAINER: IMAGE & INFO & LG:RATING & POSTED */}
      <div className="container-image-and-info-and-lg-rating-and-posted flex justify-around lg:justify-between">


        {/* CONTAINER: IMAGE & INFO */}
        <div className="container-image-and-info flex lg:ml-5 ">

        {/* IMAGE */}
        <img
          alt="location"
          src={job.pictures[0]}
          className="ml-4 mt-11 w-[4.0625rem] h-[4.0625rem] object-cover object-center rounded-full lg:w-[5.3rem] lg:h-[5.3rem] lg:mt-6 lg:ml-0"
        />

        {/* CONTAINER: INFO */}
        <div className="container-info w-[72.5%] sm:w-[80%] lg:ml-7 lg:w-[67%] ml-4">

          {/* CONTAINER: RATING & POSTED */}
          <div className="container-rating-and-posted flex w-full mt-3 mb-3 justify-between items-center lg:hidden">

            {/* CONTAINER: RATING */}
            <div className="container-rating flex items-center">

              {/* RATING'S STARS */}
              {/* Create an array with @rating number of elements and than fill it with any value (in this case number 1)
  and then iterate through it to render needed amount of stars*/}
              {Array(rating).fill(1).map((el, index) => (
                
                  // IMAGE: STAR
                  <img
                    key={index}
                    alt="star"
                    className="mx-[0.03125rem] w-[0.625rem] h-[0.625rem]"
                    src="/images/star.svg"
                  />
                ))}
            </div>

            {/* LINE: POSTED */}
            <p className="line-posted mr-[2%] text-right text-muted font-light text-sm tracking-[0.206667px]">
            Posted {calculateDate(job.createdAt)} years ago
            </p>
          </div>

          {/* JOB TITLE */}
          <h2 className="job-title text-brand text-lg h-12 overflow-hidden leading-6 tracking-tighter lg:text-xl lg:font-bold lg:mt-6 lg:tracking-[0.23619px] lg:text-[#616A81] lg:leading-[1.375rem]">
            {job.title}
          </h2>

          {/* DEPARTMENT NAME */}
          <h3 className="department-name text-muted tracking-[0.23619px] mt-1 lg:mt-3 lg:text-[#9FA4B1] lg:font-light ">
            Department name •&nbsp;
            
            {/* I'm pretty sure it's a typo but just to be pixel perfect... */}
            {/* LG: SPACE */}
            <span className="hidden lg:inline-block">&nbsp;</span>
            
            {/* JOB NAME */}
            {job.name}
          </h3>

          {/* CONTAINER: ADDRESS */}
          <div className="container-address flex items-center my-2 pb-[1.1875rem] ">

            {/* IMAGE: GEO MARKER */}
            <img alt="geo" className="h-5" src="/images/geo.svg" />

            {/* ADDRESS */}
            <p className="address text-muted ml-2 tracking-[0.23619px] lg:text-[#9FA4B1] lg:font-light">

            {/* CITY */}
            {/* If length of address array is more than 1, then reverse order of array elements and render second element which stands for city, else (e.g. if coordinates are random place in the ocean) render the only element from array (coordinates) */}
            {address.length > 1 && `${address.reverse()[1].replace(/[0-9]/g, '')},`}
            {/* COUNTRY */}
            {address[0]}
            </p>
          </div>
        </div>
        </div>

            {/* LG: CONTAINER: RATING & POSTED */}
          <div className="container-rating-and-posted hidden lg:flex w-[20.5%] mt-3 mb-3 justify-between items-center ml-16">

            {/* CONTAINER: RATING */}
            <div className="container-rating flex items-center ml-2">

              {/* RATING'S STARS */}
              {/* Create an array with @rating number of elements and than fill it with any value (in this case number 1)
  and then iterate through it to render needed amount of stars*/}
              {Array(rating).fill(1).map((el, index) => (
                
                  // IMAGE: STAR
                  <img
                    key={index}
                    alt="star"
                    className="mx-[0.03125rem] w-[0.625rem] h-[0.625rem] lg:w-[1.25rem] lg:h-[1.25rem] lg:mx-0"
                    src="/images/star-darker.svg"
                  />
                ))}
            </div>
            
            {/* CONTAINER: SAVE BUTTON & POSTED */}
            <div className="container-save-button-and-posted w-full h-[90%] flex flex-col justify-between mr-1">

                {/* BUTTON: SAVE */}
                {/* Wrap it in a Link React Router component, otherwise on click it will lead to DetailedJob page instead of calling onClick event */}
                <Link to='' className="button-save self-end mr-[0.375rem] px-3 py-3 rounded-md transition duration-75 hover:bg-background active:bg-white focus:outline-brand focus:outline-offset-2" onClick={() => console.log('Save button')}>
                    {/* IMAGE: SAVE BUTTON */}
                    <img src="/images/save-button.svg" className="w-5 h-5"/>
                    </Link>

            {/* LINE: POSTED */}
            <p className="line-posted text-right text-[#878D9D] font-light tracking-[0.23619px] mb-2 mr-3">
            Posted {calculateDate(job.createdAt)} years ago
            </p>
            </div>
          </div>
      </div>
    </div>
  );
}
