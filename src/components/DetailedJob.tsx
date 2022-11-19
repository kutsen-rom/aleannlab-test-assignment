import { Jobs as IProps } from "../App";
import { useParams } from "react-router-dom";
import { calculateDate, getAddress } from "./JobCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { mapApiKey } from "./JobCard";
import "swiper/css";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";


// Map ID to render custom map style from Google Static Map API
const mapId = process.env.REACT_APP_MAP_ID;

export default function DetailedJob ({ jobs }: IProps) {

    /**
     *  State of the address fetched from Google Geocode API
     */
    const [address, setAddress] = useState([""]);

  // Variable to get ID from URL
  const params = useParams();

  
  // Find job to show through array of jobs with job ID from current URL
  const job = jobs.find((job) => job.id === params.id);

  //   When component mounts call getAddress function once to setAddress of job object's latitude and longitude 
useEffect(() => {
    if (job) {
        getAddress(setAddress, job);
    }
  }, []);

  // If no job is found render ErrorPage component
  if (!job) {
    return <ErrorPage />;
  }



  // Get description paragraph string from start of job.description article to Responsopilities header
  const description = job.description.split("Responsopilities:")[0];

  // Get Responsopilities paragraph string...
  const responsopilities = job.description
    // from Responsopilities header...
    .split("Responsopilities:")[1]
    // to Compensation & Benefits header
    .split("Compensation & Benefits:")[0];

  // Get Compensation & Benefits array of sentences...
  const benefits = job.description
    // from Compensation & Benefits header till the end of the article...
    .split("Compensation & Benefits:")[1]
    // split that paragraph into sentences with Regular Expression...
    .split(/\./)
    // and remove last element from array because it's just a dot
    .slice(0, -1);

  return (
    // MAIN CONTAINER: JOB DETAILS PAGE
    <div className=" flex justify-center mt-5">

      {/** CONTAINER: JOB DETAILS **/}
      <div className=" w-[92%]">

        {/* MAIN HEADER: JOB DETAILS */}
        <h1 className="text-brand text-left font-bold text-[28px] border-b-[0.5px] border-b-[#E5E7EA] pb-2 tracking-[0.413333px]">
          Job Details
        </h1>

        {/** CONTAINER: BUTTONS **/}
        <div className="my-6 flex">
          
          {/* BUTTON: SAVE TO MY LIST */}
          <button onClick={() => console.log('Save to my list button')} className="flex items-center text-text mr-10 tracking-[-0.5px]">

            {/* BUTTON IMAGE: STAR */}
            <img src="/images/star-button.svg" className="w-5 mr-3" />
            Save to my list
          </button>

          {/* BUTTON: SHARE */}
          <button onClick={() => console.log('Share button')} className="flex items-center text-text mr-10 tracking-[-0.5px]">

            {/* BUTTON IMAGE: SHARE */}
            <img src="/images/share-button.svg" className="w-4 mr-2" />
            Share
          </button>
        </div>

        {/* JOB TITLE */}
        <h2 className="text-brand font-bold text-2xl leading-[30px] tracking-[-0.75px] mt-8">
          {job.title}
        </h2>

        {/* CONTAINER: POSTED & SALARY */}
        <div className="flex justify-between items-center">

          {/* POSTED */}
          <p className="text-xs font-light text-[rgba(56,_65,_93,_0.602109)]">
            Posted {calculateDate(job.createdAt)} years ago
          </p>

          {/* CONTAINER: SALARY*/}
          <div>

            {/* LINE: BRUTTO */}
            <p className="text-text text-lg tracking-[-0.5625px] text-right mt-1">
              Brutto, per year
            </p>

            {/* LINE: SALARY RANGE */}
            <h3 className="text-brand font-bold text-xl text-right mb-3 tracking-[-0.625px]">
              € {job.salary.replace(/-/, "—").replace(/k/gi, " 000")}
            </h3>
          </div>
        </div>

        {/* PARAGRAPH: DESCRIPTION */}
        <p className="text-paragraph text-lg leading-6 tracking-[-0.5625px]">
          {description}
        </p>

        {/* LINE: RESPONSOPILITIES */}
        <h4 className="text-brand font-bold mt-10 mb-1 text-xl  tracking-[-0.625px]">
          Responsopilities
        </h4>

        {/* PARAGRAPH: RESPONSOPILITIES */}
        <p className="text-paragraph text-lg leading-6 tracking-[-0.5625px]">
          {responsopilities}
        </p>

        {/* LINE: COMPENSATION & BENEFITS */}
        <h4 className="text-brand font-bold mt-4 mb-7 text-xl  tracking-[-0.625px]">
          Compensation & Benefits:
        </h4>

        {/* LINE: FIRST SENTENCE OF COMPENSATION & BENEFITS */}
        <p className="text-paragraph text-lg leading-6 tracking-[-0.5625px]">
          {benefits[0]}:
        </p>

        {/* LIST: COMPENSATION & BENEFITS */}
        <ul>

          {/* For every item in benefits array... */}
          {benefits.map((benefit, index) => {

            // except the first one, that is already used...
            if (index !== 0) {

              // render a list item
              return (

                // CONTAINER: LIST ITEM
                <div key={index} className="flex ">

                  {/* LIST ITEM: BULLET POINT */}
                  <li className="text-[rgba(56,_69,_100,_0.632594)] text-2xl list-[square] list-inside ml-[1.5px]"></li>

                  {/* LIST ITEM: TEXT */}
                  <span className="text-paragraph text-lg leading-6 tracking-[-0.5625px] pl-0">
                    {benefit}.
                  </span>
                </div>
              );
            }
          })}
        </ul>

        {/* CONTAINER: BUTTON */}
        <div className="flex justify-center mt-6">

          {/* BUTTON: APPLY NOW */}
          <button className="text-white bg-brand px-8 py-4 text-xs rounded-md">
            APPLY NOW
          </button>
        </div>

        {/** SECTION: ATTACHED IMAGES **/}

        {/* HEADER: ATTACHED IMAGES */}
        <h2 className="text-brand font-bold text-[28px]  tracking-[0.413333px] mt-[34.5%]">
          Attached images
        </h2>

        {/* HORIZONTAL LINE */}
        <hr className="mt-1 mb-6" />

        {/* CONTAINER: IMAGES (SWIPER REACT COMPONENT) */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1.8}
          slidesOffsetAfter={0}
          slidesOffsetBefore={0}
        >

          {/* For every image in job.pictures... */}
          {job.pictures.map((picture, index) => {

            // render SwiperSlide component
            return (
              <SwiperSlide key={index}>

                {/* IMAGE */}
                <img
                  className="object-cover object-bottom w-full h-[115px] rounded-lg"
                  src={picture}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/** SECTION: ADDITIONAL INFO **/}

        {/* HEADER: ADDITIONAL INFO */}
        <h2 className="text-brand font-bold text-[28px] tracking-[0.413333px] mt-[15.5%]">
          Additional info
        </h2>

        {/* HORIZONTAL LINE */}
        <hr className="mt-1 mb-4 w-[81%]" />

        {/* LINE: EMPLOYMENT TYPE */}
        <h3 className="text-text text-lg mb-2 tracking-[-0.5625px]">
          Employment type
        </h3>

        {/* CONTAINER: ALL EMPLOYMENT TYPES */}
        <div className="flex">

          {/* For every employment type */}
          {job.employment_type.map((type, index) => {
            return (

              // CONTAINER: SINGLE EMPLOYMENT TYPE
              <div key={index} className="bg-[#E1E6F4] w-1/3 mr-[2%] py-[3%] border border-[#A7AFC5] rounded-lg">

                {/* LINE: SINGLE EMPLOYMENT TYPE */}
                <h4 className="ml-[32%] text-[#55699E] font-bold tracking-[-0.457143px]">
                  {type}
                </h4>
              </div>
            );
          })}
        </div>

        {/* LINE: BENEFITS */}
        <h3 className="text-text text-lg mb-2 mt-[5.5%] tracking-[-0.5625px]">
          Benefits
        </h3>

        {/* CONTAINER: ALL BENEFITS */}
        <div className="flex">

          {/* For every benefit */}
          {job.benefits.map((benefit, index) => {
            return (

              // CONTAINER: SINGLE BENEFIT
              <div key={index} className="bg-[#FFF8D9] w-1/3 text-right mr-2 py-3 border border-[#FFCF00] rounded-lg">

                {/* LINE: SINGLE BENEFIT */}
                <h4 className="text-[#988B49] font-bold tracking-[-0.4px] text-center">
                  {benefit}
                </h4>
              </div>
            );
          })}
        </div>

        {/**  SECTION: CONTACTS  **/}

        {/* HEADER: CONTACTS */}
        <h2 className="text-brand font-bold text-[28px] tracking-[0.413333px] mt-[15.5%]">
          Contacts
        </h2>

        {/* HORIZONTAL LINE */}
        <hr className="mt-1 mb-6" />

        {/* CONTAINER: CONTACTS & MAP*/}
        <div className="w-[97.5%] ml-[7px] h-[25.6rem] rounded-lg overflow-hidden">

          {/* CONTAINER: CONTACTS */}
          <div className="bg-[#2A3047] text-[#E7EAF0] pl-[16.8%]">
            
            {/* LINE: DEPARTMENT NAME FIRST LINE */}
            <h3 className="tracking-[0.23619px] font-semibold pt-8 leading-[19px]">
              Department name.

              {/* LINE BREAK */}
              <br />

              {/* LINE: DEPARTMENT NAME SECOND LINE */}
              {job.name}.
            </h3>

            {/* LINE: ADDRESS */}
            <p className="flex tracking-[0.5px] mt-4 text-[15px] font-thin">
              
              {/* IMAGE: GEO MARKER */}
              <img src="/images/geo.svg" className="w-3 mr-2 " />

              {/* ADDRESS TEXT */}
              {/* If address has more than 1 element in array delete last element (which stands for country with real coordinates) then reverse order of elements and join them to string and separate with commas  */}
              {address.length > 1 ? address.slice(0, -1).reverse().join(", ") : address}
            </p>

            {/* LINE: PHONE NUMBER */}
            <p className="text-[rgba(255,_255,_255,_0.669635)] font-thin tracking-[0.5px] pt-2 pb-[10%] text-[15px]">
              {job.phone},

              {/* LINE BREAK */}
              <br />

              {/* LINE: EMAIL */}
              {job.email}
            </p>
          </div>

          {/* CONTAINER: MAP */}
          <div className="w-full h-80 overflow-hidden">
            
            {/* MAP */}
            <img
              className=""
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${job.location.lat - 0.0034},${job.location.long + 0.0083}&markers=icon:http://s.gravatar.com/avatar/3cf9510534e7d5dcbc2fdb25c7b6d8fb?s=38%26d=identicon%26r=PG%7C${job.location.lat},${job.location.long}&zoom=14&size=400x300&scale=2&key=${mapApiKey}&map_id=${mapId}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
