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
    <div className="w-full bg-background-job mt-2 shadow-[0px_1.5px_1px_rgb(170,170,170)] rounded-lg lg:bg-white lg:shadow-[1px_1.5px_4px_rgb(200,200,200)] lg:mt-3 hover:shadow-[1px_1.5px_6px_rgb(100,100,100)]">

      {/* CONTAINER: IMAGE & INFO & LG:RATING & POSTED */}
      <div className="flex justify-around lg:justify-between">


        {/* CONTAINER: IMAGE & INFO */}
        <div className="flex lg:ml-5 ">

        {/* IMAGE */}
        <img
          alt="location"
          src={job.pictures[0]}
          className="ml-1 mt-[11.5%] w-[65px] h-[65px] object-cover object-center rounded-full lg:w-[5.3rem] lg:h-[5.3rem] lg:mt-6 lg:ml-0"
        />

        {/* CONTAINER: INFO */}
        <div className="w-[72.5%] lg:ml-7 lg:w-[67%]">

          {/* CONTAINER: RATING & POSTED */}
          <div className="flex w-full mt-3 mb-3 justify-between items-center lg:hidden">

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
          <h2 className="text-brand text-lg h-12 overflow-hidden leading-[24px] tracking-tighter lg:text-xl lg:font-bold lg:mt-6 lg:tracking-[0.23619px] lg:text-[#616A81]">
            {job.title}
          </h2>

          {/* DEPARTMENT NAME */}
          <h3 className="text-muted tracking-[0.23619px] mt-1 lg:mt-3 lg:text-[#9FA4B1] lg:font-light ">
            Department name • 
            
            {/* I'm pretty sure it's a typo but just to be pixel perfect... */}
            {/* SPACE */}
            <span className="hidden lg:inline-block">&nbsp;&nbsp;</span>
            
            {/* JOB NAME */}
            {job.name}
          </h3>

          {/* CONTAINER: ADDRESS */}
          <div className="flex items-center my-2 pb-[19px] ">

            {/* IMAGE: GEO MARKER */}
            <img alt="geo" className="h-5" src="/images/geo.svg" />

            {/* ADDRESS */}
            <p className="text-muted ml-2 tracking-[0.23619px] lg:text-[#9FA4B1] lg:font-light">

            {/* CITY */}
            {/* If length of address array is more than 1, then reverse order of array elements and render second element which stands for city, else (e.g. if coordinates are random place in the ocean) render the only element from array (coordinates) */}
            {address.length > 1 && `${address.reverse()[1].replace(/[0-9]/g, '')},`}
            {/* COUNTRY */}
            {address[0]}
            </p>
          </div>
        </div>
        </div>

            {/* CONTAINER: RATING & POSTED */}
          <div className="hidden lg:flex w-[20.5%] mt-3 mb-3 justify-between items-center ml-16">

            {/* CONTAINER: RATING */}
            <div className="flex items-center ml-2">

              {/* RATING'S STARS */}
              {/* Create an array with @rating number of elements and than fill it with any value (in this case number 1)
  and then iterate through it to render needed amount of stars*/}
              {Array(rating).fill(1).map((el, index) => (
                
                  // IMAGE: STAR
                  <img
                    key={index}
                    alt="star"
                    className="mx-[0.5px] w-[10px] h-[10px] lg:w-[20px] lg:h-[20px] lg:mx-0"
                    src="/images/star-darker.svg"
                  />
                ))}
            </div>
            
            {/* CONTAINER: SAVE BUTTON & POSTED */}
            <div className="w-full h-[90%] flex flex-col justify-between mr-1">

                {/* BUTTON: SAVE */}
                {/* Wrap it in a Link React Router component, otherwise on click it will lead to DetailedJob page instead of calling onClick event */}
                <Link to='' className="self-end mr-[6px] px-3 py-3 rounded-md transition duration-75 hover:bg-background active:bg-white focus:outline-brand focus:outline-offset-2" onClick={() => console.log('Save button')}>
                    {/* IMAGE: SAVE BUTTON */}
                    <img src="/images/save-button.svg" className="w-5 h-5"/>
                    </Link>

            {/* LINE: POSTED */}
            <p className="text-right text-[#878D9D] font-light tracking-[0.23619px] mb-2 mr-3">
            Posted {calculateDate(job.createdAt)} years ago
            </p>
            </div>
          </div>
      </div>
    </div>
  );
}
