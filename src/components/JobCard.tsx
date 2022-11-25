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
  const [address, setAddress] = useState([""]);

  // Since rating is not provided in fetched data I'll just randomly get number of stars
  const rating = Math.ceil(Math.random() * 5);

  //   When component mounts call getAddress function once to setAddress state to fetched address by job's latitude and longtitude
  useEffect(() => {
    getAddress(setAddress, job);
  }, []);

  return (

    // MAIN CONTAINER: JOB CARD
    <div className="main-container-job-card w-full bg-background-job mt-2 shadow-[0px_1.5px_1px_rgb(170,170,170)] rounded-lg 
    lg:bg-white lg:shadow-[1px_1px_4px_rgb(180,180,180)] lg:mt-0 lg:hover:shadow-[1px_1.5px_6px_rgb(100,100,100)] 
    focus:outline-brand">

      {/* CONTAINER: IMAGE & INFO & LG:RATING & POSTED */}
      <div className="container-image-and-info-and-lg-rating-and-posted flex justify-around 
      lg:justify-between">

        {/* CONTAINER: IMAGE & INFO */}
        <div className="container-image-and-info flex w-[150%] justify-between 
        lg:ml-4 lg:justify-start">

          {/* CONTAINER: IMAGE */}
          <div className="flex w-[21%] min-w-fit justify-center 
          lg:w-0">

            {/* IMAGE */}
            <img
              alt="Job cover"
              src={job.pictures[0]}
              className="ml-4 mt-11 w-[4.0625rem] h-[4.0625rem] object-cover object-center rounded-full 
              sm:w-20 sm:h-20 
              md:w-24 md:h-24 
              lg:w-[4.5rem] lg:h-[4.5rem] lg:mt-6 lg:ml-0 
              xl:w-[5.3rem] xl:h-[5.3rem]"
            />
          </div>

          {/* CONTAINER: INFO */}
          <div className="container-info w-[72.5%] ml-[1.125rem] mr-3
          sm:w-[80%] 
          lg:ml-[1.625rem] lg:w-[67%]">
            
            {/* CONTAINER: RATING & POSTED */}
            <div className="container-rating-and-posted flex w-full mt-3 mb-3 justify-between items-center 
            lg:hidden">
              
              {/* CONTAINER: RATING */}
              <div className="container-rating flex items-center">
                
                {/* RATING'S STARS */}
                {/* Create an array with @rating number of elements and then fill it with any value (in this case asterisk *)
  and then iterate through it to render needed amount of stars*/}
                {Array(rating)
                  .fill('*')
                  .map((_, index) => (
                    // IMAGE: STAR
                    <img
                      key={index}
                      alt="star"
                      className="mx-[0.03125rem] w-[0.625rem] h-[0.625rem] 
                      sm:w-[0.8rem] sm:h-[0.9rem] 
                      md:w-[1em] md:h-[0.9rem]"
                      src="/images/star.svg"
                    />
                  ))}
              </div>

              {/* LINE: POSTED */}
              <p className="line-posted mr-1 text-right text-muted font-light text-sm tracking-[0.206667px] 
              md:text-base">
                Posted {calculateDate(job.createdAt)} years ago
              </p>
            </div>

            {/* JOB TITLE */}
            <h2 className="job-title text-brand text-lg h-12 w-[90%] overflow-hidden leading-6 
            sm:text-xl sm:h-14 
            md:font-semibold md:h-16 
            lg:h-12 lg:text-lg lg:font-bold lg:mt-[1.65rem] lg:tracking-[-0.625px] lg:text-[#616A81] lg:leading-[1.375rem] lg:w-[100%] lg:mr-0 
            xl:text-xl xl:leading-[1.375rem]">
              {job.title}
            </h2>

            {/* DEPARTMENT NAME */}
            <h3 className="department-name text-muted tracking-[0.23619px] mt-[0.375rem] 
            lg:text-[#9FA4B1] lg:font-light ">
              Department name •&nbsp;
              
              {/* I'm pretty sure it's a typo but just to do as it is in a design... */}
              {/* LG: SPACE */}
              <span className="hidden 
              lg:inline-block">&nbsp;</span>

              {/* JOB NAME */}
              {job.name}
            </h3>

            {/* CONTAINER: ADDRESS */}
            <div className="container-address flex items-center my-2 pb-[1.1875rem] 
            lg:pb-[1rem]">

              {/* IMAGE: GEO MARKER */}
              <div className="h-[1.125rem] w-[1.125rem] bg-no-repeat bg-[url('../public/images/geo.svg')] 
              lg:bg-[url('../public/images/geo-lighter.svg')]"></div>

              {/* ADDRESS */}
              <p className="address text-muted ml-1 tracking-[0.23619px] 
              lg:text-[#9FA4B1] lg:font-light lg:mt-1">

                {/* CITY */}
                {/* If length of address array is more than 1, then reverse order of array elements and render second element which stands for city, else (e.g. if coordinates are random place in the ocean) render the only element from array (coordinates) */}
                {address.length > 1 &&
                  `${address.reverse()[1].replace(/[0-9]/g, "")},`}
                {/* COUNTRY */}
                {address[0]}
              </p>
            </div>
          </div>
        </div>

        {/* LG: CONTAINER: RATING & POSTED */}
        <div className="lg-container-rating-and-posted hidden lg:flex w-[18.5rem] mt-2 mb-2 justify-between items-center ">

          {/* LG: CONTAINER: RATING */}
          <div className="lg-container-rating flex items-center -ml-20 xl:-ml-28">

            {/* LG: RATING'S STARS */}
            {/* Create an array with @rating number of elements and then fill it with any value (in this case asterisk *)
  and then iterate through it to render needed amount of stars*/}
            {Array(rating)
              .fill('*')
              .map((_, index) => (
                // LG: IMAGE: STAR
                <img
                  key={index}
                  alt="star"
                  className="lg-image-star mx-[0.03125rem] 
                  lg:w-4 lg:h-4 lg:mx-0
                  xl:w-5 xl:h-5"
                  src="/images/star-darker.svg"
                />
              ))}
          </div>

          {/* LG: CONTAINER: SAVE BUTTON & POSTED */}
          <div className="lg-container-save-button-and-posted w-full h-[90%] flex flex-col justify-between mr-1">

            {/* LG: BUTTON: SAVE */}
            {/* Wrap it in a Link React Router component, otherwise (if it is an <a></a> tag) on click it will lead to DetailedJob page instead of calling onClick event */}
            <Link
              to=""
              className="lg-button-save self-end mr-[0.375rem] px-3 py-3 rounded-md 
              hover:bg-[#EDEFF9] transition duration-100 
              active:bg-white 
              focus:outline-brand focus:outline-offset-2"
              onClick={() => console.log("Save button")}
            >

              {/* IMAGE: SAVE BUTTON */}
              <img src="/images/save-button.svg" className="w-5 h-5" />
            </Link>

            {/* LG: LINE: POSTED */}
            <p className=" w-36 lg-line-posted text-right text-muted font-light tracking-[0.23619px] mb-[0.65rem] ml-5 mr-20 xl:mr-32 2xl:mr-0">
              Posted {calculateDate(job.createdAt)} years ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
